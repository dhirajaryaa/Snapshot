"use client";

import { Analytics } from "@vercel/analytics/next";

export function WebAnalytics() {
  return (
    <Analytics
      beforeSend={(event) => {
        try {
          const url = new URL(event.url, "https://snapshot.dev");
          if (url.pathname.startsWith("/_next")) return null;
          return { ...event, url: `${url.origin}${url.pathname}` };
        } catch {
          return event;
        }
      }}
    />
  );
}
