#!/bin/bash
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Install build tools (equivalent of Xcode Command Line Tools on Linux)
apt-get install -y --no-install-recommends \
  git \
  build-essential \
  curl \
  wget \
  2>/dev/null || true
