#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FRONTEND_DIR="$ROOT_DIR/frontend"
ANDROID_DIR="$FRONTEND_DIR/android"
REPORT_DIR="$ROOT_DIR/docs/release/audit-v0.3.1"

ANDROID_HOME="${ANDROID_HOME:-$HOME/Library/Android/sdk}"
JAVA_HOME="${JAVA_HOME:-/Applications/Android Studio.app/Contents/jbr/Contents/Home}"

export ANDROID_HOME
export JAVA_HOME

mkdir -p "$REPORT_DIR"

echo "========================================"
echo "QA Cat Buddy — Android release audit"
echo "========================================"
echo "Project: $ROOT_DIR"
echo "Reports: $REPORT_DIR"
echo

cd "$FRONTEND_DIR"

echo "[1/9] Frontend production build..."
npm run build \
  2>&1 | tee "$REPORT_DIR/frontend-build.txt"

echo
echo "[2/9] Capacitor Android sync..."
npx cap sync android \
  2>&1 | tee "$REPORT_DIR/capacitor-sync.txt"

cd "$ANDROID_DIR"

echo
echo "[3/9] Release manifest generation..."
./gradlew :app:processReleaseMainManifest \
  --console=plain \
  2>&1 | tee "$REPORT_DIR/gradle-release-manifest.txt"

echo
echo "[4/9] Unsigned release APK build..."
./gradlew :app:assembleRelease \
  --console=plain \
  2>&1 | tee "$REPORT_DIR/gradle-release-build.txt"

echo
echo "[5/9] Searching for merged release manifest..."

MERGED_MANIFEST="$(
  find app/build/intermediates \
    -type f \
    -name AndroidManifest.xml \
    -path "*release*" \
    2>/dev/null |
    sort |
    head -n 1
)"

if [ -z "$MERGED_MANIFEST" ]; then
  echo "Merged release manifest was not found."
  exit 1
fi

echo "Manifest: $MERGED_MANIFEST"
cp "$MERGED_MANIFEST" \
  "$REPORT_DIR/AndroidManifest-release.xml"

python3 - "$MERGED_MANIFEST" <<'PYXML' \
  > "$REPORT_DIR/android-permissions.txt"
import sys
import xml.etree.ElementTree as ET

manifest_path = sys.argv[1]
android_ns = "{http://schemas.android.com/apk/res/android}"

root = ET.parse(manifest_path).getroot()

permission_tags = {
    "uses-permission",
    "uses-permission-sdk-23",
    "uses-permission-sdk-m",
}

permissions = set()

for element in root:
    if element.tag in permission_tags:
        name = element.attrib.get(android_ns + "name")

        if name:
            permissions.add(name)

for permission in sorted(permissions):
    print(permission)
PYXML

grep -nE \
  '<uses-permission|<uses-feature|<service|<receiver|<provider' \
  "$MERGED_MANIFEST" \
  > "$REPORT_DIR/android-components.txt" || true

grep -nE \
  'usesCleartextTraffic|networkSecurityConfig|allowBackup|debuggable|extractNativeLibs' \
  "$MERGED_MANIFEST" \
  > "$REPORT_DIR/android-security-attributes.txt" || true

echo
echo "[6/9] Dependency audit..."

cd "$FRONTEND_DIR"

npm ls --depth=0 \
  > "$REPORT_DIR/npm-direct-dependencies.txt" \
  2>&1 || true

cd "$ANDROID_DIR"

./gradlew :app:dependencies \
  --configuration releaseRuntimeClasspath \
  --console=plain \
  > "$REPORT_DIR/android-release-dependencies.txt" \
  2>&1 || true

echo
echo "[7/9] Analytics, advertising and tracking SDK scan..."

cd "$ROOT_DIR"

grep -RniE \
  'firebase|analytics|appmetrica|mytracker|crashlytics|sentry|amplitude|mixpanel|adjust|appsflyer|admob|mobile.?ads|facebook.?sdk|advertising.?id|onesignal' \
  frontend/package.json \
  frontend/package-lock.json \
  frontend/android/build.gradle \
  frontend/android/app/build.gradle \
  frontend/android/settings.gradle \
  frontend/android/gradle.properties \
  2>/dev/null \
  > "$REPORT_DIR/tracking-sdk-scan.txt" || true

echo
echo "[8/9] Network usage scan..."

grep -RniE \
  'https?://|fetch[[:space:]]*\(|axios|XMLHttpRequest|WebSocket|sendBeacon|EventSource' \
  frontend/src \
  frontend/capacitor.config.ts \
  frontend/package.json \
  frontend/android/app/src/main \
  --exclude-dir=build \
  --exclude-dir=assets \
  --exclude='*.map' \
  2>/dev/null \
  > "$REPORT_DIR/network-usage-scan.txt" || true

echo
echo "[9/9] APK audit..."

cd "$ANDROID_DIR"

RELEASE_APK="$(
  find app/build/outputs/apk/release \
    -type f \
    -name "*.apk" \
    2>/dev/null |
    sort |
    head -n 1
)"

if [ -z "$RELEASE_APK" ]; then
  echo "Release APK was not found."
  exit 1
fi

echo "APK: $RELEASE_APK"

shasum -a 256 "$RELEASE_APK" \
  > "$REPORT_DIR/release-apk-sha256.txt"

ls -lh "$RELEASE_APK" \
  > "$REPORT_DIR/release-apk-size.txt"

unzip -l "$RELEASE_APK" \
  > "$REPORT_DIR/release-apk-files.txt"

unzip -l "$RELEASE_APK" |
  grep -E '\.so$' \
  > "$REPORT_DIR/native-libraries.txt" || true

AAPT="$(
  find "$ANDROID_HOME/build-tools" \
    -type f \
    -name aapt \
    2>/dev/null |
    sort |
    tail -n 1
)"

if [ -n "$AAPT" ]; then
  "$AAPT" dump permissions "$RELEASE_APK" \
    > "$REPORT_DIR/aapt-permissions.txt" \
    2>&1 || true

  "$AAPT" dump badging "$RELEASE_APK" \
    > "$REPORT_DIR/aapt-badging.txt" \
    2>&1 || true
else
  echo "aapt was not found." \
    > "$REPORT_DIR/aapt-permissions.txt"
fi

echo
echo "========================================"
echo "AUDIT COMPLETED"
echo "========================================"
echo
echo "Release APK:"
echo "$RELEASE_APK"
echo
echo "Declared Android permissions:"
if [ -s "$REPORT_DIR/android-permissions.txt" ]; then
  cat "$REPORT_DIR/android-permissions.txt"
else
  echo "No android.permission entries found."
fi

echo
echo "Tracking SDK matches:"
if [ -s "$REPORT_DIR/tracking-sdk-scan.txt" ]; then
  cat "$REPORT_DIR/tracking-sdk-scan.txt"
else
  echo "No known analytics, advertising or tracking SDK matches found."
fi

echo
echo "Reports saved to:"
echo "$REPORT_DIR"
