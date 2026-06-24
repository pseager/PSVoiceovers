#!/usr/bin/env python3
"""Batch outreach for non-union commercial and promo/imaging VO contacts."""

from __future__ import annotations

import argparse
import csv
import json
import os
import re
import smtplib
import sys
import time
from datetime import datetime, timezone
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DEFAULT_CONFIG = ROOT / "config.json"
DEFAULT_CONTACTS = ROOT / "contacts.csv"
DEFAULT_TEMPLATES = ROOT / "templates"
DEFAULT_DRAFTS = ROOT / "drafts"
DEFAULT_LOG = ROOT / "sent_log.csv"

LOG_FIELDS = [
    "timestamp",
    "contact_id",
    "company",
    "email",
    "template",
    "mode",
    "subject",
    "status",
    "error",
]


def load_json(path: Path) -> dict:
    with path.open(encoding="utf-8") as handle:
        return json.load(handle)


def load_template(name: str) -> str:
    path = DEFAULT_TEMPLATES / f"{name}.txt"
    if not path.exists():
        raise FileNotFoundError(f"Template not found: {path}")
    return path.read_text(encoding="utf-8")


def parse_template(raw: str) -> tuple[str, str]:
    lines = raw.splitlines()
    if not lines or not lines[0].lower().startswith("subject:"):
        raise ValueError("Template must start with 'Subject: ...'")
    subject = lines[0].split(":", 1)[1].strip()
    body = "\n".join(lines[1:]).lstrip("\n")
    return subject, body


def render(text: str, values: dict[str, str]) -> str:
    result = text
    for key, value in values.items():
        result = result.replace(f"{{{{{key}}}}}", value)
    missing = re.findall(r"\{\{([^}]+)\}\}", result)
    if missing:
        raise KeyError(f"Missing template values: {', '.join(sorted(set(missing)))}")
    return result


def is_sendable_email(value: str) -> bool:
    return "@" in value and not value.startswith("http")


def read_contacts(path: Path) -> list[dict[str, str]]:
    with path.open(newline="", encoding="utf-8") as handle:
        return list(csv.DictReader(handle))


def write_contacts(path: Path, rows: list[dict[str, str]], fieldnames: list[str]) -> None:
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def append_log(path: Path, row: dict[str, str]) -> None:
    exists = path.exists()
    with path.open("a", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=LOG_FIELDS)
        if not exists:
            writer.writeheader()
        writer.writerow(row)


def build_context(config: dict, contact: dict[str, str]) -> dict[str, str]:
    sender = config["sender"]
    contact_name = (contact.get("contact_name") or "").strip()
    generic_names = {
        "general inquiries",
        "general contact",
        "general info",
        "contact team",
        "casting team",
        "casting office",
        "vo department",
        "vo division",
        "vo submissions",
        "support team",
        "production team",
        "talent submissions",
        "business office",
        "talent auditions",
        "affiliate relations",
        "agency team",
        "submissions",
        "demo submission",
    }
    first_name = contact_name.split()[0] if contact_name else ""
    use_greeting = first_name and contact_name.lower() not in generic_names
    greeting = f" {first_name}" if use_greeting else ""
    return {
        "sender_name": sender["name"],
        "sender_email": sender["email"],
        "sender_phone": sender["phone"],
        "website": sender["website"],
        "demo_url": sender["demo_url"],
        "linkedin": sender.get("linkedin", ""),
        "source_connect": sender.get("source_connect", ""),
        "physical_address": sender.get("physical_address", ""),
        "company": contact.get("company", ""),
        "contact_name": contact_name,
        "contact_greeting": greeting,
    }


def select_contacts(
    rows: list[dict[str, str]],
    *,
    limit: int,
    contact_type: str | None,
    priority: str | None,
    include_sent: bool,
) -> list[dict[str, str]]:
    selected: list[dict[str, str]] = []
    for row in rows:
        status = (row.get("status") or "pending").lower()
        if status in {"sent", "skipped"} and not include_sent:
            continue
        if status == "manual":
            continue
        if contact_type and row.get("contact_type") != contact_type:
            continue
        if priority and row.get("priority") != priority:
            continue
        email = row.get("email", "")
        if not is_sendable_email(email):
            continue
        selected.append(row)
        if len(selected) >= limit:
            break
    return selected


def save_draft(contact: dict[str, str], subject: str, body: str) -> Path:
    DEFAULT_DRAFTS.mkdir(parents=True, exist_ok=True)
    slug = re.sub(r"[^a-z0-9]+", "-", contact["company"].lower()).strip("-")
    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S")
    path = DEFAULT_DRAFTS / f"{contact['id']}-{slug}-{stamp}.md"
    path.write_text(
        "\n".join(
            [
                "---",
                f"to: {contact['email']}",
                f"company: {contact['company']}",
                f"contact_id: {contact['id']}",
                f"subject: {subject}",
                "---",
                "",
                body,
            ]
        ),
        encoding="utf-8",
    )
    return path


def send_email(
    config: dict,
    recipient: str,
    subject: str,
    body: str,
    *,
    app_password: str,
) -> None:
    sender = config["sender"]
    smtp_cfg = config["smtp"]
    message = MIMEMultipart()
    message["From"] = f"{config['outreach'].get('default_from_name', sender['name'])} <{sender['email']}>"
    message["To"] = recipient
    message["Subject"] = subject
    message.attach(MIMEText(body, "plain", "utf-8"))

    with smtplib.SMTP(smtp_cfg["host"], smtp_cfg["port"], timeout=30) as server:
        if smtp_cfg.get("use_tls", True):
            server.starttls()
        server.login(sender["email"], app_password)
        server.send_message(message)


def validate_config(config: dict) -> None:
    address = config["sender"].get("physical_address", "")
    if not address or "YOUR MAILING ADDRESS" in address:
        raise ValueError(
            "Set sender.physical_address in config.json before sending live email "
            "(CAN-SPAM compliance)."
        )


def run(args: argparse.Namespace) -> int:
    config_path = Path(args.config)
    contacts_path = Path(args.contacts)

    if not config_path.exists():
        print(f"Missing config: {config_path}")
        print("Copy config.example.json to config.json and fill in your details.")
        return 1

    config = load_json(config_path)
    rows = read_contacts(contacts_path)
    if not rows:
        print("No contacts found.")
        return 1

    fieldnames = list(rows[0].keys())
    batch_size = args.batch_size or config["outreach"].get("batch_size", 10)
    delay = args.delay or config["outreach"].get("delay_seconds", 45)

    selected = select_contacts(
        rows,
        limit=batch_size,
        contact_type=args.type,
        priority=args.priority,
        include_sent=args.include_sent,
    )

    if not selected:
        print("No eligible contacts in this batch.")
        return 0

    if args.send:
        validate_config(config)
        app_password = os.environ.get("GMAIL_APP_PASSWORD")
        if not app_password:
            print("Set GMAIL_APP_PASSWORD in your environment to send email.")
            return 1

    print(f"Processing {len(selected)} contact(s) in {args.mode} mode...\n")

    for contact in selected:
        template_name = contact.get("template") or "agent_submission"
        try:
            raw_template = load_template(template_name)
            subject_template, body_template = parse_template(raw_template)
            context = build_context(config, contact)
            subject = render(subject_template, context)
            body = render(body_template, context)
        except Exception as exc:  # noqa: BLE001 - CLI tool reports all render issues
            print(f"[ERROR] {contact['company']}: {exc}")
            contact["status"] = "error"
            contact["last_error"] = str(exc)
            continue

        print(f"- {contact['company']} <{contact['email']}>")
        print(f"  Subject: {subject}")

        if args.mode == "dry-run":
            print("  Preview:\n")
            print(body)
            print("\n" + "-" * 60 + "\n")
            append_log(
                DEFAULT_LOG,
                {
                    "timestamp": datetime.now(timezone.utc).isoformat(),
                    "contact_id": contact["id"],
                    "company": contact["company"],
                    "email": contact["email"],
                    "template": template_name,
                    "mode": "dry-run",
                    "subject": subject,
                    "status": "previewed",
                    "error": "",
                },
            )
            continue

        if args.mode == "draft":
            path = save_draft(contact, subject, body)
            contact["status"] = "draft"
            contact["sent_date"] = datetime.now(timezone.utc).date().isoformat()
            print(f"  Draft saved: {path}")
            append_log(
                DEFAULT_LOG,
                {
                    "timestamp": datetime.now(timezone.utc).isoformat(),
                    "contact_id": contact["id"],
                    "company": contact["company"],
                    "email": contact["email"],
                    "template": template_name,
                    "mode": "draft",
                    "subject": subject,
                    "status": "draft_saved",
                    "error": "",
                },
            )
            continue

        if args.send:
            try:
                send_email(
                    config,
                    contact["email"],
                    subject,
                    body,
                    app_password=os.environ["GMAIL_APP_PASSWORD"],
                )
                contact["status"] = "sent"
                contact["sent_date"] = datetime.now(timezone.utc).date().isoformat()
                contact["last_error"] = ""
                print("  Sent.")
                append_log(
                    DEFAULT_LOG,
                    {
                        "timestamp": datetime.now(timezone.utc).isoformat(),
                        "contact_id": contact["id"],
                        "company": contact["company"],
                        "email": contact["email"],
                        "template": template_name,
                        "mode": "send",
                        "subject": subject,
                        "status": "sent",
                        "error": "",
                    },
                )
                time.sleep(delay)
            except Exception as exc:  # noqa: BLE001 - report SMTP failures per contact
                contact["status"] = "error"
                contact["last_error"] = str(exc)
                print(f"  Send failed: {exc}")
                append_log(
                    DEFAULT_LOG,
                    {
                        "timestamp": datetime.now(timezone.utc).isoformat(),
                        "contact_id": contact["id"],
                        "company": contact["company"],
                        "email": contact["email"],
                        "template": template_name,
                        "mode": "send",
                        "subject": subject,
                        "status": "error",
                        "error": str(exc),
                    },
                )

    write_contacts(contacts_path, rows, fieldnames)
    print("\nDone. Updated contacts.csv and sent_log.csv.")
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--config", default=str(DEFAULT_CONFIG))
    parser.add_argument("--contacts", default=str(DEFAULT_CONTACTS))
    parser.add_argument("--batch-size", type=int, default=None)
    parser.add_argument("--delay", type=int, default=None)
    parser.add_argument("--type", choices=["agent", "imaging", "casting", "management"])
    parser.add_argument("--priority", choices=["high", "medium", "low"])
    parser.add_argument("--include-sent", action="store_true")

    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--dry-run", action="store_true", help="Print previews only (default)")
    mode.add_argument("--draft", action="store_true", help="Save reviewable drafts to outreach/drafts/")
    mode.add_argument("--send", action="store_true", help="Send via Gmail SMTP")

    parser.set_defaults(mode="dry-run")
    return parser


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    if args.draft:
        args.mode = "draft"
    elif args.send:
        args.mode = "send"
    else:
        args.mode = "dry-run"
    return run(args)


if __name__ == "__main__":
    sys.exit(main())
