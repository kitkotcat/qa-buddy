import { Capacitor } from "@capacitor/core";

export function isNativeApp(): boolean {
  return Capacitor.isNativePlatform();
}

export function getCurrentPlatform(): string {
  return Capacitor.getPlatform();
}
