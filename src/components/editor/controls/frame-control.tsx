import React from 'react';
import { cn } from '@/lib/utils';
import { EditorSettings } from '@/components/presets';
import { AccordionSection } from '../accordion-section';
import { IconDeviceLaptop, IconLink, IconCheck } from '@tabler/icons-react';

interface FrameControlProps {
  settings: EditorSettings;
  theme: 'light' | 'dark';
  activeSection: string;
  onToggleSection: (id: string) => void;
  onUpdateSetting: <K extends keyof EditorSettings>(key: K, value: EditorSettings[K]) => void;
}

export const FrameControl: React.FC<FrameControlProps> = ({
  settings,
  theme,
  activeSection,
  onToggleSection,
  onUpdateSetting
}) => {
  return (
    <AccordionSection id="frame" title="Window & Mockup" icon={IconDeviceLaptop} activeSection={activeSection} onToggle={onToggleSection} theme={theme}>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider opacity-60">Window Chrome Style</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'None (Plain)', value: 'none' },
              { label: 'macOS Dark', value: 'macos-dark' },
              { label: 'macOS Light', value: 'macos-light' },
              { label: 'Windows Dark', value: 'windows-dark' },
              { label: 'Windows Light', value: 'windows-light' },
              { label: 'Browser Dark', value: 'browser-dark' },
              { label: 'Browser Light', value: 'browser-light' }
            ].map((frame) => {
              const isSelected = settings.frameStyle === frame.value;
              return (
                <button
                  key={frame.value}
                  onClick={() => onUpdateSetting('frameStyle', frame.value as any)}
                  className={cn(
                    "py-2 px-1.5 rounded-lg border text-[10px] font-bold transition-all text-left truncate flex items-center justify-between",
                    isSelected
                      ? "border-brand bg-brand/10 text-neutral-100"
                      : theme === 'dark'
                        ? "border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200"
                        : "border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-600 hover:text-neutral-800"
                  )}
                >
                  <span>{frame.label}</span>
                  {isSelected && <IconCheck className="w-3.5 h-3.5 text-brand-light ml-1 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {settings.frameStyle.startsWith('browser') && (
          <div className="space-y-2 animate-in fade-in duration-200">
            <label className="text-[11px] font-bold uppercase tracking-wider opacity-60">Browser Mockup URL</label>
            <div className="flex items-center space-x-2">
              <IconLink className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
              <input
                type="text"
                value={settings.browserUrl}
                onChange={(e) => onUpdateSetting('browserUrl', e.target.value)}
                placeholder="e.g. app.myproduct.com"
                className={cn(
                  "flex-1 px-2.5 py-1.5 rounded-lg border text-xs font-mono",
                  theme === 'dark'
                    ? "bg-neutral-900 border-neutral-800 text-neutral-200 focus:border-brand outline-none"
                    : "bg-neutral-50 border-neutral-200 text-neutral-700 focus:border-brand outline-none"
                )}
              />
            </div>
          </div>
        )}
      </div>
    </AccordionSection>
  );
};
