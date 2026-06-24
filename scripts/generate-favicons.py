#!/usr/bin/env python3
"""Generate high-contrast favicons: white thickened logo on navy background."""

from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFilter
except ImportError:
    raise SystemExit('Install Pillow: pip3 install pillow')

ROOT = Path(__file__).resolve().parents[1]
LOGO_PATH = ROOT / 'src/assets/images/logo.png'
PUBLIC = ROOT / 'public'
BG = (22, 75, 114, 255)  # #164b72


def white_logo(source_size: int, thicken: int) -> Image.Image:
    logo = Image.open(LOGO_PATH).convert('RGBA')
    ratio = source_size / max(logo.width, logo.height)
    logo = logo.resize(
        (max(1, int(logo.width * ratio)), max(1, int(logo.height * ratio))),
        Image.Resampling.LANCZOS,
    )
    alpha = logo.split()[3]
    if thicken > 1:
        alpha = alpha.filter(ImageFilter.MaxFilter(thicken))
    white = Image.new('RGBA', logo.size, (255, 255, 255, 0))
    white.putalpha(alpha)
    return white


def make_icon(size: int, out_name: str, corner_radius: int) -> None:
    bg = Image.new('RGBA', (size, size), BG)
    thicken = 7 if size <= 32 else 5
    pad = int(size * 0.16)
    target = size - pad * 2
    logo = white_logo(target, thicken)
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
