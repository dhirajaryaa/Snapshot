import React, { useState } from 'react';
import {
  IconSun,
  IconMoon,
  IconRefresh,
  IconUpload,
  IconCopy,
  IconDownload,
  IconDotsVertical,
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
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-border bg-card text-card-foreground shrink-0 z-50 relative">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg overflow-hidden bg-brand/80 shadow-sm flex items-center justify-center shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Snapshot Logo" className="w-full h-full object-contain p-1" />
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-tight">Snapshot Editor</h1>
          <p className="text-[10px] text-muted-foreground -mt-0.5 font-medium hidden sm:block">Customize your screenshots.</p>
        </div>
      </div>

      {/* Global Toolbar */}
      <div className="flex items-center space-x-1.5 sm:space-x-2.5">
        <button
          onClick={onThemeToggle}
          className="p-2 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <IconSun className="w-4 h-4" /> : <IconMoon className="w-4 h-4" />}
        </button>

        {imageUrl && (
          <>
            {/* Mobile Edit Controls Toggle */}
            <button
              onClick={onToggleSidebar}
              className={cn(
                "p-2 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-accent md:hidden transition-all duration-200",
                mobileSidebarOpen ? "bg-brand/10 border-brand/35 text-brand" : ""
              )}
              title="Toggle Edit Controls"
            >
              <IconAdjustments className="w-4 h-4" />
            </button>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-2.5">
              {/* Reset Button */}
              <button
                onClick={onReset}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-border bg-card hover:bg-accent text-muted-foreground hover:text-foreground transition-all duration-200"
              >
                <IconRefresh className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

              {/* Swap Screenshot Button */}
              <button
                onClick={onUploadClick}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-border bg-card hover:bg-accent text-muted-foreground hover:text-foreground transition-all duration-200"
              >
                <IconUpload className="w-3.5 h-3.5" />
                <span>Swap Screenshot</span>
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
            </div>

            {/* Always visible Primary Download Button */}
            <button
              onClick={onDownload}
              disabled={isExporting}
              className="flex items-center space-x-1.5 px-3 sm:px-4 py-2 rounded-lg text-white bg-brand hover:bg-brand-hover font-bold text-xs transition-all duration-200 shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? (
                <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <IconDownload className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline">Download</span>
            </button>

            {/* Mobile Actions Dropdown Toggle */}
            <div className="relative md:hidden">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200"
              >
                <IconDotsVertical className="w-4 h-4" />
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowMenu(false)}
                  />
                  <div className="absolute right-0 top-12 w-48 bg-card border border-border rounded-xl shadow-xl z-50 flex flex-col p-1.5 animate-in slide-in-from-top-2 duration-200">
                    <button
                      onClick={() => { onCopyToClipboard(); setShowMenu(false); }}
                      className="flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    >
                      <IconCopy className="w-4 h-4" />
                      <span>Copy to Clipboard</span>
                    </button>
                    <button
                      onClick={() => { onUploadClick(); setShowMenu(false); }}
                      className="flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    >
                      <IconUpload className="w-4 h-4" />
                      <span>Swap Screenshot</span>
                    </button>
                    <div className="h-px bg-border my-1 w-full" />
                    <button
                      onClick={() => { onReset(); setShowMenu(false); }}
                      className="flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold text-red-500 hover:bg-red-500/10 transition-colors"
                    >
                      <IconRefresh className="w-4 h-4" />
                      <span>Reset Settings</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
};
