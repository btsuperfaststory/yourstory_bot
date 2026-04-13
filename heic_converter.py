#!/usr/bin/env python3
"""Convert a single HEIC/HEIF image to JPEG format.

Usage:
    python3 heic_converter.py <input_file> <output_file> [quality]

This script is used by convert_heic_to_jpeg.sh but can also be run standalone.
"""

import sys
from pathlib import Path

import pillow_heif
from PIL import Image

# Register HEIF opener with Pillow
pillow_heif.register_heif_opener()


def convert_heic_to_jpeg(input_path: str, output_path: str, quality: int = 95) -> None:
    """Convert a HEIC/HEIF file to JPEG.

    Args:
        input_path: Path to the input HEIC/HEIF file.
        output_path: Path for the output JPEG file.
        quality: JPEG quality (1-100).
    """
    img = Image.open(input_path)

    # Preserve EXIF data if available
    exif_data = img.info.get("exif")

    # Handle images with alpha channel by compositing onto white background
    if img.mode in ("RGBA", "PA"):
        background = Image.new("RGB", img.size, (255, 255, 255))
        background.paste(img, mask=img.split()[-1])
        img = background
    elif img.mode != "RGB":
        img = img.convert("RGB")

    save_kwargs = {"quality": quality, "optimize": True}
    if exif_data:
        save_kwargs["exif"] = exif_data

    img.save(output_path, "JPEG", **save_kwargs)


def main() -> None:
    if len(sys.argv) < 3:
        print(f"Usage: {sys.argv[0]} <input_file> <output_file> [quality]")
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2]
    quality = int(sys.argv[3]) if len(sys.argv) > 3 else 95

    if not Path(input_file).exists():
        print(f"Error: Input file '{input_file}' not found.")
        sys.exit(1)

    convert_heic_to_jpeg(input_file, output_file, quality)


if __name__ == "__main__":
    main()
