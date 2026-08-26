import React from 'react';
import Link from 'next/link';
import {
  IconSun,
  IconMoon,
  IconRefresh,
  IconUpload,
  IconCopy,
  IconDownload,
  IconAdjustments
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
  mobileSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export const EditorHeader: React.FC<EditorHeaderProps> = ({
  imageUrl,
  theme,
  onThemeToggle,
  onReset,
  onUploadClick,
  onDownload,
  onCopyToClipboard,
  isExporting,
  mobileSidebarOpen,
  onToggleSidebar
}) => {
  return (
    <header className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-border bg-card text-card-foreground shrink-0 z-50 relative select-none">
      {/* Brand Logo & Name (Link to Homepage) */}
      <Link href="/" className="flex items-center space-x-3 group cursor-pointer">
        <div className="w-8 h-8 rounded-lg overflow-hidden bg-brand/80 shadow-sm flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Snapshot Logo" className="w-full h-full object-contain p-1" />
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-tight group-hover:text-brand transition-colors">Snapshot</h1>
          <p className="text-[10px] text-muted-foreground -mt-0.5 font-medium hidden sm:block">Turn screenshots into visuals.</p>
        </div>
      </Link>

      {/* Global Toolbar */}
      <div className="flex items-center space-x-2">
        <button
          onClick={onThemeToggle}
          className="h-9 w-9 flex items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <IconSun className="w-4 h-4" /> : <IconMoon className="w-4 h-4" />}
        </button>

        {imageUrl && (
          <>
            {/* Mobile Edit Controls Toggle with Icon and Text */}
            <button
              onClick={onToggleSidebar}
              className={cn(
                "flex items-center space-x-1.5 h-9 px-3 rounded-lg border text-xs font-semibold border-border bg-card text-muted-foreground hover:text-foreground hover:bg-accent md:hidden transition-all duration-200",
                mobileSidebarOpen ? "bg-brand/10 border-brand/35 text-brand" : ""
              )}
              title="Toggle Edit Controls"
            >
              <IconAdjustments className="w-4 h-4" />
              <span>Controls</span>
            </button>

            {/* Desktop Actions (Reset, Swap, Copy) */}
            <div className="hidden md:flex items-center space-x-2">
              {/* Reset Button */}
              <button
                onClick={onReset}
                className="flex items-center space-x-1.5 h-9 px-3 rounded-lg text-xs font-semibold border border-border bg-card hover:bg-accent text-muted-foreground hover:text-foreground transition-all duration-200"
              >
                <IconRefresh className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

              {/* Swap Screenshot Button */}
              <button
                onClick={onUploadClick}
                className="flex items-center space-x-1.5 h-9 px-3 rounded-lg text-xs font-semibold border border-border bg-card hover:bg-accent text-muted-foreground hover:text-foreground transition-all duration-200"
              >
                <IconUpload className="w-3.5 h-3.5" />
                <span>Swap Screenshot</span>
              </button>

              {/* Copy Button */}
              <button
                onClick={onCopyToClipboard}
                disabled={isExporting}
                className="flex items-center space-x-1.5 h-9 px-3.5 rounded-lg border border-border bg-card hover:bg-accent text-muted-foreground hover:text-foreground font-semibold text-xs transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isExporting ? (
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-brand border-t-transparent animate-spin" />
                ) : (
                  <IconCopy className="w-3.5 h-3.5" />
                )}
                <span>Copy</span>
              </button>
            </div>

            {/* Download Button (Adjusted for perfect square styling on mobile, standard on desktop) */}
            <button
              onClick={onDownload}
              disabled={isExporting}
              className="flex items-center justify-center h-9 w-9 md:w-auto md:px-4 rounded-lg text-white bg-brand hover:bg-brand-hover font-bold text-xs transition-all duration-200 shadow disabled:opacity-50 disabled:cursor-not-allowed gap-x-1.5"
              title="Download Screenshot"
            >
              {isExporting ? (
                <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <IconDownload className="w-4 h-4 shrink-0" />
              )}
              <span className="hidden md:inline">Download</span>
            </button>
          </>
        )}
      </div>
    </header>
  );
};
