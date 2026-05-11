#!/usr/bin/env bash
# Run Playwright smoke tests inside the official Playwright Docker image.
# This avoids needing sudo to install system-level browser dependencies.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
PW_VERSION=$(node -e "try{console.log(require('@playwright/test/package.json').version)}catch{console.log('1.59.1')}")
IMAGE="mcr.microsoft.com/playwright:v${PW_VERSION}-noble"

echo "Using Playwright Docker image: $IMAGE"

# Ensure output directories exist and are writable
mkdir -p "$PROJECT_DIR/test-results" "$PROJECT_DIR/smoke-report"

docker run --rm \
  --network host \
  --user "$(id -u):$(id -g)" \
  -v "$PROJECT_DIR":/work \
  -w /work \
  -e HOME=/tmp \
  -e BASE_URL="${BASE_URL:-https://www.visionc.co.kr}" \
  "$IMAGE" \
  npx playwright test tests/smoke --config=playwright.smoke.config.ts "$@"
