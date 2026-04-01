#!/usr/bin/env bash
#
# convert_heic_to_jpeg.sh - Convert HEIC/HEIF images to JPEG format
#
# Usage:
#   ./convert_heic_to_jpeg.sh <input_path> [output_dir] [--quality N] [--recursive]
#
# Arguments:
#   input_path   A single HEIC file or a directory containing HEIC files
#   output_dir   Directory to save converted JPEGs (default: same as input)
#   --quality N  JPEG quality 1-100 (default: 95)
#   --recursive  Search subdirectories for HEIC files
#
# Examples:
#   ./convert_heic_to_jpeg.sh photo.heic
#   ./convert_heic_to_jpeg.sh ~/Photos/ ~/Converted/ --quality 90
#   ./convert_heic_to_jpeg.sh ~/Photos/ --recursive

set -euo pipefail

QUALITY=95
RECURSIVE=false
INPUT_PATH=""
OUTPUT_DIR=""

usage() {
    echo "Usage: $0 <input_path> [output_dir] [--quality N] [--recursive]"
    echo ""
    echo "Convert HEIC/HEIF images to JPEG format."
    echo ""
    echo "Arguments:"
    echo "  input_path   A single HEIC file or a directory containing HEIC files"
    echo "  output_dir   Directory to save converted JPEGs (default: same as input)"
    echo "  --quality N  JPEG quality 1-100 (default: 95)"
    echo "  --recursive  Search subdirectories for HEIC files"
    exit 1
}

# Parse arguments
while [[ $# -gt 0 ]]; do
    case "$1" in
        --quality)
            if [[ -z "${2:-}" ]] || ! [[ "$2" =~ ^[0-9]+$ ]] || [[ "$2" -lt 1 ]] || [[ "$2" -gt 100 ]]; then
                echo "Error: --quality requires a number between 1 and 100"
                exit 1
            fi
            QUALITY="$2"
            shift 2
            ;;
        --recursive)
            RECURSIVE=true
            shift
            ;;
        --help|-h)
            usage
            ;;
        *)
            if [[ -z "$INPUT_PATH" ]]; then
                INPUT_PATH="$1"
            elif [[ -z "$OUTPUT_DIR" ]]; then
                OUTPUT_DIR="$1"
            else
                echo "Error: Unexpected argument '$1'"
                usage
            fi
            shift
            ;;
    esac
done

if [[ -z "$INPUT_PATH" ]]; then
    echo "Error: No input path specified."
    usage
fi

if [[ ! -e "$INPUT_PATH" ]]; then
    echo "Error: '$INPUT_PATH' does not exist."
    exit 1
fi

# Determine the Python script location (same directory as this script)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PYTHON_CONVERTER="$SCRIPT_DIR/heic_converter.py"

if [[ ! -f "$PYTHON_CONVERTER" ]]; then
    echo "Error: Python converter script not found at $PYTHON_CONVERTER"
    echo "Please ensure heic_converter.py is in the same directory as this script."
    exit 1
fi

# Check Python dependencies
if ! python3 -c "import pillow_heif, PIL" 2>/dev/null; then
    echo "Error: Required Python packages not found."
    echo "Install them with: pip3 install Pillow pillow-heif"
    exit 1
fi

# Collect HEIC files
declare -a FILES=()

if [[ -f "$INPUT_PATH" ]]; then
    FILES+=("$INPUT_PATH")
elif [[ -d "$INPUT_PATH" ]]; then
    if [[ "$RECURSIVE" == true ]]; then
        while IFS= read -r -d '' file; do
            FILES+=("$file")
        done < <(find "$INPUT_PATH" -type f \( -iname "*.heic" -o -iname "*.heif" \) -print0)
    else
        while IFS= read -r -d '' file; do
            FILES+=("$file")
        done < <(find "$INPUT_PATH" -maxdepth 1 -type f \( -iname "*.heic" -o -iname "*.heif" \) -print0)
    fi
else
    echo "Error: '$INPUT_PATH' is not a file or directory."
    exit 1
fi

if [[ ${#FILES[@]} -eq 0 ]]; then
    echo "No HEIC/HEIF files found in '$INPUT_PATH'."
    exit 0
fi

echo "Found ${#FILES[@]} HEIC/HEIF file(s) to convert."
echo "JPEG quality: $QUALITY"
echo ""

SUCCESS=0
FAILED=0

for file in "${FILES[@]}"; do
    # Determine output path
    if [[ -n "$OUTPUT_DIR" ]]; then
        mkdir -p "$OUTPUT_DIR"
        basename="${file##*/}"
        name="${basename%.*}"
        output="$OUTPUT_DIR/${name}.jpg"
    else
        dir="$(dirname "$file")"
        basename="${file##*/}"
        name="${basename%.*}"
        output="$dir/${name}.jpg"
    fi

    # Avoid overwriting
    if [[ -f "$output" ]]; then
        counter=1
        while [[ -f "${output%.*}_${counter}.jpg" ]]; do
            ((counter++))
        done
        output="${output%.*}_${counter}.jpg"
    fi

    echo -n "Converting: $file -> $output ... "

    if python3 "$PYTHON_CONVERTER" "$file" "$output" "$QUALITY" 2>/dev/null; then
        echo "OK"
        ((SUCCESS++))
    else
        echo "FAILED"
        ((FAILED++))
    fi
done

echo ""
echo "Done. $SUCCESS succeeded, $FAILED failed out of ${#FILES[@]} file(s)."
