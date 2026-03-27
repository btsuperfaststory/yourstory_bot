#!/bin/bash
# MediaPlace3 Setup Verification Script for SuperFastStory-AI
# Run this on your Mac to verify the folder structure before configuring MediaPlace3.

set -euo pipefail

BASE_PATH="/Volumes/SDPRO_2TB/MirrorFilesNOTStreamFiles/SuperFastStory-AI"

echo "=== MediaPlace3 Setup Verification ==="
echo ""

# Task 1: Check if the SanDisk drive is mounted
echo "[1/3] Checking SanDisk drive..."
if [ -d "/Volumes/SDPRO_2TB" ]; then
    echo "  OK: SDPRO_2TB drive is mounted."
else
    echo "  FAIL: SDPRO_2TB drive is NOT mounted."
    echo "  -> Please plug in your SanDisk drive and try again."
    exit 1
fi

# Task 2: Check root folder
echo "[2/3] Checking SuperFastStory-AI root folder..."
if [ -d "$BASE_PATH" ]; then
    echo "  OK: SuperFastStory-AI folder exists."
else
    echo "  FAIL: $BASE_PATH does not exist."
    echo "  -> Ensure Google Drive for Desktop is in Mirror mode and synced."
    exit 1
fi

# Task 3: Check required top-level folders
echo "[3/3] Checking required folders..."

REQUIRED_FOLDERS=("_INGEST" "PRODUCTIONS" "BRAND" "STOCK" "ARCHIVE")
MISSING=()

for folder in "${REQUIRED_FOLDERS[@]}"; do
    if [ -d "$BASE_PATH/$folder" ]; then
        echo "  OK: $folder/"
    else
        echo "  MISSING: $folder/"
        MISSING+=("$folder")
    fi
done

# Check _INGEST subfolders
echo ""
echo "Checking _INGEST subfolders..."
INGEST_SUBS=("From-Higgsfield" "From-Flova" "From-InVideo" "From-Suno" "From-CapCut" "From-Perplexity")

for sub in "${INGEST_SUBS[@]}"; do
    if [ -d "$BASE_PATH/_INGEST/$sub" ]; then
        echo "  OK: _INGEST/$sub/"
    else
        echo "  MISSING: _INGEST/$sub/"
        MISSING+=("_INGEST/$sub")
    fi
done

# Summary
echo ""
echo "=== Summary ==="
if [ ${#MISSING[@]} -eq 0 ]; then
    echo "All folders verified. Ready to configure MediaPlace3!"
    echo ""
    echo "Next steps:"
    echo "  1. Open MediaPlace3"
    echo "  2. Add library: $BASE_PATH"
    echo "  3. Set up Folder Watch on: $BASE_PATH/_INGEST/"
    echo "  4. Create Smart Folders (see mediaplace3-setup-guide.md)"
    echo "  5. Enable AI plugins"
else
    echo "Missing ${#MISSING[@]} folder(s). Creating them now..."
    for folder in "${MISSING[@]}"; do
        mkdir -p "$BASE_PATH/$folder"
        echo "  Created: $folder/"
    done
    echo "Done. Re-run this script to verify."
fi
