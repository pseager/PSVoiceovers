# VO Outreach (Non-Union Commercial & Promo/Imaging)

Automated batch outreach for casting directors, agents, imaging companies, and production contacts that hire non-union commercial and promo/imaging voice talent.

## What's included

- `contacts.csv` — 60 seed contacts (verified public sources; form-only entries marked manual)
- `templates/agent_submission.txt` — agency representation inquiries
- `templates/imaging_roster.txt` — imaging/production roster inquiries
- `send_outreach.py` — batch preview, draft, or send tool
- `config.example.json` — your sender profile and batch settings

## Quick start

```bash
cd outreach
cp config.example.json config.json
# Edit config.json — especially physical_address (CAN-SPAM requirement)
python3 send_outreach.py --dry-run --batch-size 3
```

### Recommended workflow

1. **Preview** a small batch: `python3 send_outreach.py --dry-run --priority high --batch-size 5`
2. **Save drafts** for review: `python3 send_outreach.py --draft --priority high --batch-size 10`
3. **Send** after you approve copy: `python3 send_outreach.py --send --batch-size 10`

Default batch size is 10 with a 45-second delay between sends.

## Gmail setup (for --send)

1. Enable 2-Step Verification on your Google account
2. Create an [App Password](https://myaccount.google.com/apppasswords) for "Mail"
3. Export it before running:

```bash
export GMAIL_APP_PASSWORD="your-16-char-app-password"
python3 send_outreach.py --send --batch-size 10
```

Use `paul@psvoiceovers.com` in `config.json` so sends match your domain identity.

## Commands

| Command | Purpose |
|---------|---------|
| `--dry-run` | Print email previews (default) |
| `--draft` | Write markdown drafts to `drafts/` |
| `--send` | Send via Gmail SMTP |
| `--priority high` | Only high-priority contacts |
| `--type agent` | Filter by contact type |
| `--include-sent` | Re-process already-sent rows |

## Contact types

| Type | Goal |
|------|------|
| `agent` | Representation for commercial/promo work |
| `imaging` | Radio/TV imaging and promo production rosters |
| `casting` | Casting director relationships |
| `management` | Talent management / booking companies |

Rows with `status=manual` (website forms only) are skipped by the script — submit those by hand.

## Expanding the list

Good sources for more non-union-friendly contacts:

- [Voice Over Resource Guide](https://voiceoverresourceguide.com/) — filter Regional + Talent Agencies
- Agency submission pages (always use their listed email/form)
- Radio imaging company websites (Benztown, SPLAT, Audiobag, etc.)

Add rows to `contacts.csv` with `status=pending`. Verify emails on the company website before sending.

## Compliance notes

- Include your physical mailing address in `config.json` (CAN-SPAM)
- Every template includes an unsubscribe line
- Start with 10–15 emails/week; increase slowly to protect deliverability
- Personalize when possible — generic blasts get deleted

## Files not committed

Copy locally and keep private:

- `config.json` (your address and sender details)
- `sent_log.csv` (send history)
- `drafts/` (generated review files)
