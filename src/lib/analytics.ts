import { track } from "@vercel/analytics";

export function trackImageAdded(source: "upload" | "drop" | "paste" | "sample") {
  track("image_added", { source });
}

export function trackExport(action: "download" | "copy", format: string, scale: number) {
  track("export", { action, format, scale });
}

export function trackPresetApplied(name: string) {
  track("preset_applied", { name });
}
