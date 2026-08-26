import React from 'react';
import { SnapshotEditor } from '@/components/snapshot-editor';

export default function Home() {
  return (
    <main className="flex-1 flex flex-col h-full">
      <SnapshotEditor />
    </main>
  );
}
