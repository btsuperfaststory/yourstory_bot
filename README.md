# yourstory_bot
Your Story BOT turns YS customers into raving fans.

## HEIC to JPEG Converter

A bash/Python tool to batch-convert HEIC/HEIF images to JPEG format with EXIF preservation.

### Prerequisites

- Python 3.8+
- pip

### Installation

```bash
pip3 install -r requirements.txt
chmod +x convert_heic_to_jpeg.sh
```

### Usage

```bash
# Convert a single file
./convert_heic_to_jpeg.sh photo.heic

# Convert all HEIC files in a directory
./convert_heic_to_jpeg.sh ~/Photos/

# Convert to a specific output directory with custom quality
./convert_heic_to_jpeg.sh ~/Photos/ ~/Converted/ --quality 90

# Recursively search subdirectories
./convert_heic_to_jpeg.sh ~/Photos/ --recursive

# Use the Python script directly
python3 heic_converter.py input.heic output.jpg 95
```

### Options

| Option | Description |
|---|---|
| `input_path` | A single HEIC file or directory containing HEIC files |
| `output_dir` | Directory to save JPEGs (default: same as input) |
| `--quality N` | JPEG quality 1-100 (default: 95) |
| `--recursive` | Search subdirectories for HEIC files |
