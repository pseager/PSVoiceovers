#!/usr/bin/env python3
"""Generate crisp, readable favicons for browser tabs and home screens."""

import base64
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    raise SystemExit('Install Pillow: pip3 install pillow')

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public'

NAVY = '#164b72'
GOLD = '#e7c16f'
WHITE = '#ffffff'

FONT_CANDIDATES = [
    '/System/Library/Fonts/Supplemental/Georgia Bold.ttf',
    '/System/Library/Fonts/Supplemental/Times New Roman Bold.ttf',
    '/Library/Fonts/Georgia Bold.ttf',
    '/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf',
]


def load_font(size: int):
    for path in FONT_CANDIDATES:
        font_path = Path(path)
        if font_path.exists():
            return ImageFont.truetype(str(font_path), size)
    return ImageFont.load_default()


def rounded_icon(size: int) -> Image.Image:
    render_size = 1024
    canvas = Image.new('RGBA', (render_size, render_size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)
    inset = int(render_size * 0.04)
    radius = int(18 * (render_size / 32))

    draw.rounded_rectangle(
        (inset, inset, render_size - inset, render_size - inset),
        radius=radius,
        fill=NAVY,
    )

    arc_inset = int(render_size * 0.12)
    draw.arc(
        (
            arc_inset,
            int(render_size * 0.05),
            render_size - arc_inset,
            int(render_size * 0.72),
        ),
        start=205,
        end=335,
        fill=GOLD,
        width=max(10, render_size // 56),
    )

    font = load_font(int(render_size * 0.34))
    text = 'PS'
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    text_x = (render_size - text_width) // 2 - text_bbox[0]
    text_y = int(render_size * 0.43) - text_height // 2 - text_bbox[1]

    stroke = max(6, render_size // 120)
    draw.text(
        (text_x, text_y),
        text,
        font=font,
        fill=WHITE,
        stroke_width=stroke,
        stroke_fill=WHITE,
    )

    border_width = max(4, render_size // 80)
    draw.rounded_rectangle(
        (inset, inset, render_size - inset - 1, render_size - inset - 1),
        radius=radius,
        outline=(255, 255, 255, 220),
        width=border_width,
    )

    return canvas.resize((size, size), Image.Resampling.LANCZOS)


def write_svg() -> None:
    svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="PS Voiceovers">
  <rect width="32" height="32" rx="6" fill="#164b72"/>
  <path d="M5.5 10.5 C11 6.5 21 6.5 26.5 10.5" fill="none" stroke="#e7c16f" stroke-width="1.8" stroke-linecap="round"/>
  <text x="16" y="21.5" text-anchor="middle" fill="#ffffff" font-family="Georgia, 'Times New Roman', serif" font-size="13.5" font-weight="700">PS</text>
  <rect x="1.2" y="1.2" width="29.6" height="29.6" rx="5.2" fill="none" stroke="#ffffff" stroke-opacity="0.85" stroke-width="0.9"/>
</svg>
"""
    (PUBLIC / 'favicon.svg').write_text(svg, encoding='utf-8')


def write_svg_from_png(png_path: Path, svg_path: Path) -> None:
    encoded = base64.b64encode(png_path.read_bytes()).decode('ascii')
    svg_path.write_text(
        '\n'.join(
            [
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="PS Voiceovers">',
                f'  <image href="data:image/png;base64,{encoded}" width="32" height="32"/>',
                '</svg>',
                '',
            ]
        ),
        encoding='utf-8',
    )


def write_png(path: Path, image: Image.Image) -> None:
    image.save(path, format='PNG', optimize=True)


if __name__ == '__main__':
    icon_32 = rounded_icon(32)
    icon_180 = rounded_icon(180)
    icon_192 = rounded_icon(192)

    write_png(PUBLIC / 'favicon-32.png', icon_32)
    write_png(PUBLIC / 'apple-touch-icon.png', icon_180)
    write_png(PUBLIC / 'favicon-192.png', icon_192)
    write_svg()
    print('High-visibility favicons updated.')
