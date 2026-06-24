#!/usr/bin/env python3
"""Generate favicons from the site logo, optimized for small tab sizes."""

import base64
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageEnhance, ImageFilter
except ImportError:
    raise SystemExit('Install Pillow: pip3 install pillow')

ROOT = Path(__file__).resolve().parents[1]
LOGO_PATH = ROOT / 'src/assets/images/logo.png'
PUBLIC = ROOT / 'public'

NAVY = (22, 75, 114, 255)
WHITE = (255, 255, 255, 255)


def crop_logo_mark(logo: Image.Image) -> Image.Image:
    bbox = logo.getbbox()
    if not bbox:
        return logo
    logo = logo.crop(bbox)
    keep_height = max(1, int(logo.height * 0.68))
    return logo.crop((0, 0, logo.width, keep_height))


def prepare_logo_mark(max_dimension: int) -> Image.Image:
    logo = Image.open(LOGO_PATH).convert('RGBA')
    logo = crop_logo_mark(logo)

    alpha = logo.split()[3].point(lambda value: 255 if value > 28 else 0)
    for _ in range(5):
        alpha = alpha.filter(ImageFilter.MaxFilter(5))

    red, green, blue, _ = logo.split()
    mark = Image.merge('RGBA', (red, green, blue, alpha))

    enhancer = ImageEnhance.Brightness(mark)
    mark = enhancer.enhance(1.18)
    enhancer = ImageEnhance.Contrast(mark)
    mark = enhancer.enhance(1.2)
    enhancer = ImageEnhance.Color(mark)
    mark = enhancer.enhance(1.15)

    ratio = max_dimension / max(mark.width, mark.height)
    new_size = (max(1, int(mark.width * ratio)), max(1, int(mark.height * ratio)))
    return mark.resize(new_size, Image.Resampling.LANCZOS)


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

    mark = prepare_logo_mark(int(render_size * 0.82))
    x = (render_size - mark.width) // 2
    y = (render_size - mark.height) // 2 - int(render_size * 0.01)

    halo_alpha = mark.split()[3].filter(ImageFilter.MaxFilter(9))
    halo = Image.new('RGBA', mark.size, (255, 255, 255, 0))
    halo_fill = Image.new('RGBA', mark.size, (255, 255, 255, 55))
    halo_fill.putalpha(halo_alpha.point(lambda value: min(255, value)))
    canvas.alpha_composite(halo_fill, (x, y))
    canvas.alpha_composite(mark, (x, y))

    border_width = max(4, render_size // 80)
    draw.rounded_rectangle(
        (inset, inset, render_size - inset - 1, render_size - inset - 1),
        radius=radius,
        outline=(255, 255, 255, 200),
        width=border_width,
    )

    return canvas.resize((size, size), Image.Resampling.LANCZOS)


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
    write_svg_from_png(PUBLIC / 'favicon-32.png', PUBLIC / 'favicon.svg')
    print('Logo favicons updated.')
