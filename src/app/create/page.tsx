import React from 'react';
import { SnapshotEditor } from '@/components/snapshot-editor';

export const metadata = {
  title: "Editor - Snapshot Screenshot Beautifier",
  description: "Upload and customize screenshots with gradients, browser mockups, shadow styles, and padding constraints.",
};

export default function CreatePage() {
  return (
    <main className="flex-1 flex flex-col h-full bg-[#0a0a0a]">
      <SnapshotEditor />
    </main>
  );
}
