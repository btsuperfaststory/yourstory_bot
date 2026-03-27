# MediaPlace3 Configuration Guide — SuperFastStory-AI

## Prerequisites

- MediaPlace3 installed (Max plan, $24/mo)
- Google Drive for Desktop in **Mirror mode**
- SanDisk SDPRO_2TB external drive connected
- Root path: `/Volumes/SDPRO_2TB/MirrorFilesNOTStreamFiles/SuperFastStory-AI/`

## Step 0: Verify Folder Structure

Run the verification script from your Mac terminal:

```bash
chmod +x mediaplace3/verify-setup.sh
./mediaplace3/verify-setup.sh
```

Expected folder tree:

```
SuperFastStory-AI/
├── _INGEST/
│   ├── From-Higgsfield/
│   ├── From-Flova/
│   ├── From-InVideo/
│   ├── From-Suno/
│   ├── From-CapCut/
│   └── From-Perplexity/
├── PRODUCTIONS/
├── BRAND/
├── STOCK/
└── ARCHIVE/
```

## Step 1: Add the Library

1. Open MediaPlace3
2. In the **Library panel**, click the **"+"** button
3. Navigate to: `/Volumes/SDPRO_2TB/MirrorFilesNOTStreamFiles/SuperFastStory-AI/`
4. Select the **SuperFastStory-AI** root folder
5. MediaPlace3 will mirror this folder structure as a one-to-one sync

## Step 2: Set Up Folder Watch

1. Go to **Settings → Folder Watch**
2. Click **Add** to create a new watch rule
3. Set watch folder to: `/Volumes/SDPRO_2TB/MirrorFilesNOTStreamFiles/SuperFastStory-AI/_INGEST/`
4. Enable **Include all subfolders** (covers From-Higgsfield, From-Flova, From-InVideo, From-Suno, From-CapCut, From-Perplexity)
5. Set Action to: **Auto-import to library**

This ensures any file dropped into `_INGEST/` by any AI tool automatically appears in MediaPlace3.

## Step 3: Create Smart Folders

Create these 8 Smart Folders via **File → New Smart Folder** (or the Smart Folder button):

| # | Name | Filter Criteria |
|---|------|----------------|
| 1 | **All Video** | Type = Video |
| 2 | **All Audio** | Type = Audio |
| 3 | **All Images** | Type = Image |
| 4 | **Recent (7 Days)** | Modified within last 7 days |
| 5 | **Untagged Assets** | Tags = None |
| 6 | **5-Star Selects** | Rating = 5 stars |
| 7 | **AOTA Footage** | Folder contains "ALL-OF-THE-ABOVE" AND Type = Video |
| 8 | **AOTA Audio** | Folder contains "ALL-OF-THE-ABOVE" AND Type = Audio |

## Step 4: Enable AI Plugins

In the **AI section** of Settings or Toolbar, enable these plugins:

| Plugin | Notes |
|--------|-------|
| **AI Auto-Tagging for Images** | Enable, then run on PRODUCTIONS folder |
| **AI Auto-Tagging for Videos** | Enable |
| **AI Background Removal** | Enable (free, unlimited) |
| **AI Image Upscaling** | Enable |

AI plugins may require a one-time download on first enable.

## Step 5: Verify Configuration

Checklist:

- [ ] Library panel shows the full SuperFastStory-AI folder tree
- [ ] Folder Watch shows `_INGEST/` as a watched folder
- [ ] All 8 Smart Folders appear in the sidebar
- [ ] AI plugins show as enabled in settings
- [ ] Dropping a test file into `_INGEST/From-CapCut/` auto-imports it

## Troubleshooting

| Issue | Fix |
|-------|-----|
| SDPRO_2TB not visible | Plug in the SanDisk drive, check Finder sidebar |
| Folders missing | Run `verify-setup.sh` — it will create missing folders |
| Folder Watch not triggering | Ensure "Include subfolders" is enabled |
| AI plugins grayed out | Confirm Max plan ($24/mo) is active |
| Google Drive not syncing | Open Google Drive for Desktop → Preferences → confirm Mirror mode |
