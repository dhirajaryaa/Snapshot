import React from 'react';
import { cn } from '@/lib/utils';
import { EditorSettings, Preset } from '@/components/presets';
import { IconUpload, IconRefresh } from '@tabler/icons-react';

// Controls
import { PresetsControl } from './controls/presets-control';
import { LayoutControl } from './controls/layout-control';
import { CropControl } from './controls/crop-control';
import { BackgroundControl } from './controls/background-control';
import { FrameControl } from './controls/frame-control';
import { StylingControl } from './controls/styling-control';
import { ExportControl } from './controls/export-control';

interface SidebarAreaProps {
  settings: EditorSettings;
  theme: 'light' | 'dark';
  activeSection: string;
  onToggleSection: (section: string) => void;
  applyPreset: (preset: Preset) => void;
  updateSetting: <K extends keyof EditorSettings>(key: K, value: EditorSettings[K]) => void;
  customSolid: string;
  setCustomSolid: (val: string) => void;
  mobileSidebarOpen: boolean;
  onReset: () => void;
  onUploadClick: () => void;
}

export const SidebarArea: React.FC<SidebarAreaProps> = ({
  settings,
  theme,
  activeSection,
  onToggleSection,
  applyPreset,
  updateSetting,
  customSolid,
  setCustomSolid,
  mobileSidebarOpen,
  onReset,
  onUploadClick
}) => {
  return (
    <section className={cn(
      "fixed top-16 bottom-0 left-0 z-40 w-72 sm:w-80 border-r border-border flex flex-col overflow-y-auto select-none bg-card text-card-foreground transition-transform duration-300 ease-in-out md:relative md:top-0 md:h-full md:translate-x-0",
      mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      {/* Mobile Quick Actions (Reset & Swap) */}
      <div className="p-3.5 border-b border-border flex items-center space-x-2 shrink-0 md:hidden bg-muted/20">
        <button
          onClick={onUploadClick}
          className="flex-1 flex items-center justify-center space-x-1.5 py-1.5 px-3 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground text-xs font-semibold transition-colors duration-200"
        >
          <IconUpload className="w-3.5 h-3.5 text-muted-foreground" />
          <span>Swap</span>
        </button>
        <button
          onClick={onReset}
          className="flex-1 flex items-center justify-center space-x-1.5 py-1.5 px-3 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground text-xs font-semibold transition-colors duration-200"
        >
          <IconRefresh className="w-3.5 h-3.5 text-muted-foreground" />
          <span>Reset</span>
        </button>
      </div>

      <div className="flex-1">
        {/* 1. Presets */}
        <PresetsControl
          settings={settings}
          activeSection={activeSection}
          onToggleSection={onToggleSection}
          onApplyPreset={applyPreset}
        />

        {/* 2. Aspect Ratio & Canvas Size */}
        <LayoutControl
          settings={settings}
          activeSection={activeSection}
          onToggleSection={onToggleSection}
          onUpdateSetting={updateSetting}
        />

        {/* 3. Crop & Zoom Scale */}
        <CropControl
          settings={settings}
          activeSection={activeSection}
          onToggleSection={onToggleSection}
          onUpdateSetting={updateSetting}
        />

        {/* 4. Background Settings */}
        <BackgroundControl
          settings={settings}
          activeSection={activeSection}
          onToggleSection={onToggleSection}
          onUpdateSetting={updateSetting}
          customSolid={customSolid}
          setCustomSolid={setCustomSolid}
        />

        {/* 5. Frame settings */}
        <FrameControl
          settings={settings}
          activeSection={activeSection}
          onToggleSection={onToggleSection}
          onUpdateSetting={updateSetting}
        />

        {/* 6. Styling Properties */}
        <StylingControl
          settings={settings}
          activeSection={activeSection}
          onToggleSection={onToggleSection}
          onUpdateSetting={updateSetting}
        />

        {/* 7. Export Panel */}
        <ExportControl
          settings={settings}
          activeSection={activeSection}
          onToggleSection={onToggleSection}
          onUpdateSetting={updateSetting}
        />
      </div>

      {/* Bottom branding footer */}
      <div className="p-4 border-t border-border text-center text-[10px] select-none mt-auto opacity-70 bg-muted/30 text-muted-foreground">
        Snapshot &copy; 2026. Made with ❤️ and developed by{' '}
        <a
          href="https://dhirajarya.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-brand underline font-semibold transition-colors"
        >
          dhirajaryaa
        </a>
      </div>
    </section>
  );
};
