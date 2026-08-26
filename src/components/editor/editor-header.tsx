import React from 'react';
import {
  IconSun,
  IconMoon,
  IconRefresh,
  IconUpload,
  IconCopy,
  IconDownload,
  IconBrandGithub,
  IconBrandX
} from '@tabler/icons-react';
import { cn } from '@/lib/utils';

interface EditorHeaderProps {
  imageUrl: string | null;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  onReset: () => void;
  onUploadClick: () => void;
  onDownload: () => void;
  onCopyToClipboard: () => void;
  isExporting: boolean;
}

export const EditorHeader: React.FC<EditorHeaderProps> = ({
  imageUrl,
  theme,
  onThemeToggle,
  onReset,
  onUploadClick,
  onDownload,
  onCopyToClipboard,
  isExporting
}) => {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-card text-card-foreground shrink-0 z-20">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg overflow-hidden bg-brand shadow-sm flex items-center justify-center shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Snapshot Logo" className="w-full h-full object-contain" />
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-tight">Snapshot Editor</h1>
          <p className="text-[10px] text-muted-foreground -mt-0.5 font-medium hidden sm:block">Customize your screenshots.</p>
        </div>
      </div>

      {/* Global Toolbar */}
      <div className="flex items-center space-x-2.5">
        <button
          onClick={onThemeToggle}
          className="p-2 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <IconSun className="w-4 h-4" /> : <IconMoon className="w-4 h-4" />}
        </button>

        {imageUrl && (
          <>
            {/* Reset Button */}
            <button
              onClick={onReset}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-border bg-card hover:bg-accent text-muted-foreground hover:text-foreground transition-all duration-200"
            >
              <IconRefresh className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            {/* Swap Screenshot Button */}
            <button
              onClick={onUploadClick}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-border bg-card hover:bg-accent text-muted-foreground hover:text-foreground transition-all duration-200"
            >
              <IconUpload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Swap Screenshot</span>
            </button>

            {/* Copy Button */}
            <button
              onClick={onCopyToClipboard}
              disabled={isExporting}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg border border-border bg-card hover:bg-accent text-muted-foreground hover:text-foreground font-semibold text-xs transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? (
                <span className="w-3.5 h-3.5 rounded-full border-2 border-brand border-t-transparent animate-spin" />
              ) : (
                <IconCopy className="w-3.5 h-3.5" />
              )}
              <span>Copy</span>
            </button>

            {/* Download Button */}
            <button
              onClick={onDownload}
              disabled={isExporting}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-lg text-white bg-brand hover:bg-brand-hover font-bold text-xs transition-all duration-200 shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? (
                <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <IconDownload className="w-3.5 h-3.5" />
              )}
              <span>Download</span>
            </button>
          </>
        )}
      </div>
    </header>
  );
};
