import React from 'react';
import { SnapshotEditor } from '@/components/snapshot-editor';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://snapshot.dev';

export const metadata = {
  title: "Editor - Snapshot Screenshot Beautifier",
  description: "Upload and customize screenshots with gradients, browser mockups, shadow styles, and padding constraints.",
  openGraph: {
    title: "Editor - Snapshot Screenshot Beautifier",
    description: "Upload and customize screenshots with gradients, browser mockups, shadow styles, and padding constraints.",
    type: "website",
    url: `${siteUrl}/create`,
    images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: "Snapshot Editor Workspace" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Editor - Snapshot Screenshot Beautifier",
    description: "Upload and customize screenshots with gradients, browser mockups, shadow styles, and padding constraints.",
    images: [`${siteUrl}/og-image.png`]
  }
};

export default function CreatePage() {
  return (
    <main className="flex-1 flex flex-col h-full bg-[#0a0a0a]">
      <SnapshotEditor />
    </main>
  );
}
