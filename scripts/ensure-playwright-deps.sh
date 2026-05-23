#!/usr/bin/env bash
# Ensure Playwright system dependencies are available without root.
# Downloads .deb packages and extracts shared libraries to a user-local path.
# Subsequent runs skip download if the libs already exist.
set -euo pipefail

DEPS_DIR="$HOME/.local/lib/playwright-deps/usr/lib/x86_64-linux-gnu"

if [ -f "$DEPS_DIR/libatk-1.0.so.0" ] && [ -f "$DEPS_DIR/libgbm.so.1" ]; then
  exit 0
fi

echo "Installing Playwright dependencies to user-local path..."
WORK_DIR=$(mktemp -d)
trap 'rm -rf "$WORK_DIR"' EXIT

cd "$WORK_DIR"
apt-get download \
  libatk1.0-0t64 libatk-bridge2.0-0t64 libxcomposite1 libxdamage1 \
  libxfixes3 libxrandr2 libgbm1 libasound2t64 libatspi2.0-0t64 \
  libcups2t64 libxkbcommon0 libxrender1 libxi6 2>/dev/null

mkdir -p "$HOME/.local/lib/playwright-deps"
for deb in *.deb; do
  dpkg-deb -x "$deb" "$HOME/.local/lib/playwright-deps/"
done

echo "Playwright dependencies installed to $DEPS_DIR"
