#!/usr/bin/env python3
"""Generate favicons with a light blue background for gold logo contrast."""

from pathlib import Path

try:
    from PIL import Image, ImageDraw
except ImportError:
    raise SystemExit('Install Pillow: pip3 install pillow')

ROOT = Path(__file__).resolve().parents[1]
LOGO_PATH = ROOT / 'src/assets/images/logo.png'
PUBLIC = ROOT / 'public'
# Lighter site blue so gold logo reads clearly on tabs
BG = (74, 131, 150, 255)  # #4a8396


def make_icon(size: int, out_name: str, corner_radius: int) -> None:
    bg = Image.new('RGBA', (size, size), BG)
    logo = Image.open(LOGO_PATH).convert('RGBA')
    pad = int(size * 0.14)
    target = size - pad * 2
    ratio = min(target / logo.width, target / logo.height)
    new_size = (max(1, int(logo.width * ratio)), max(1, int(logo.height * ratio)))
    logo = logo.resize(new_size, Image.Resampling.LANCZOS)
    x = (size - logo.width) // 2
    y = (size - logo.height) // 2
    bg.alpha_composite(logo, (x, y))
    mask = Image.new('L', (size, size), 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle((0, 0, size, size), radius=corner_radius, fill=255)
    bg.putalpha(mask)
    bg.save(PUBLIC / out_name, format='PNG')


if __name__ == '__main__':
    make_icon(32, 'favicon-32.png', 6)
    make_icon(192, 'favicon-192.png', 36)
    make_icon(180, 'apple-touch-icon.png', 34)
    print('Favicons updated.')
