# Matrix Client Expressive - Building APK

## Prerequisites
- Android SDK (API 34)
- Android NDK
- JDK 11+
- Gradle

## Build Instructions

```bash
cd android
./gradlew assembleRelease
```

Output: `android/app/build/outputs/apk/release/app-release.apk`

## Signing

Keystores are pre-configured in `build.gradle`.

## Install

```bash
adb install -r android/app/build/outputs/apk/release/app-release.apk
```
