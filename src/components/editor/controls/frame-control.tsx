import React from 'react';
import { cn } from '@/lib/utils';
import { EditorSettings } from '@/components/presets';
import { AccordionSection } from '../accordion-section';
import { IconDeviceLaptop, IconLink, IconCheck } from '@tabler/icons-react';

interface FrameControlProps {
  settings: EditorSettings;
  activeSection: string;
  onToggleSection: (id: string) => void;
  onUpdateSetting: <K extends keyof EditorSettings>(key: K, value: EditorSettings[K]) => void;
}

export const FrameControl: React.FC<FrameControlProps> = ({
  settings,
  activeSection,
  onToggleSection,
  onUpdateSetting
}) => {
  return (
    <AccordionSection id="frame" title="Window & Mockup" icon={IconDeviceLaptop} activeSection={activeSection} onToggle={onToggleSection}>
      <div className="space-y-4">
        {/* Desktop frames */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider opacity-60">Desktop Mockups</label>
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
                      ? "border-brand bg-brand/10 text-brand"
                      : "border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <span>{frame.label}</span>
                  {isSelected && <IconCheck className="w-3.5 h-3.5 text-brand shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile & Tablet frames */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider opacity-60">Mobile & Tablet Mockups</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'iPhone Portrait', value: 'phone-portrait' },
              { label: 'iPad Portrait', value: 'tablet-portrait' },
              { label: 'iPhone Landscape', value: 'phone-landscape' },
              { label: 'iPad Landscape', value: 'tablet-landscape' }
            ].map((frame) => {
              const isSelected = settings.frameStyle === frame.value;
              return (
                <button
                  key={frame.value}
                  onClick={() => onUpdateSetting('frameStyle', frame.value as any)}
                  className={cn(
                    "py-2 px-1.5 rounded-lg border text-[10px] font-bold transition-all text-left truncate flex items-center justify-between",
                    isSelected
                      ? "border-brand bg-brand/10 text-brand"
                      : "border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <span>{frame.label}</span>
                  {isSelected && <IconCheck className="w-3.5 h-3.5 text-brand shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Window Title Input */}
        {settings.frameStyle !== 'none' && !settings.frameStyle.startsWith('phone') && !settings.frameStyle.startsWith('tablet') && (
          <div className="space-y-2 animate-in fade-in duration-200">
            <label className="text-[11px] font-bold uppercase tracking-wider opacity-60">Window Title / Browser Tab</label>
            <input
              type="text"
              value={settings.windowTitle}
              onChange={(e) => onUpdateSetting('windowTitle', e.target.value)}
              placeholder="e.g. My Awesome App"
              className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-muted text-foreground text-xs font-semibold focus:border-brand focus:ring-1 focus:ring-brand outline-none"
            />
          </div>
        )}

        {/* Browser Mockup URL */}
        {settings.frameStyle.startsWith('browser') && (
          <div className="space-y-2 animate-in fade-in duration-200">
            <label className="text-[11px] font-bold uppercase tracking-wider opacity-60">Browser Mockup URL</label>
            <div className="flex items-center space-x-2">
              <IconLink className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              <input
                type="text"
                value={settings.browserUrl}
                onChange={(e) => onUpdateSetting('browserUrl', e.target.value)}
                placeholder="e.g. app.myproduct.com"
                className="flex-1 px-2.5 py-1.5 rounded-lg border border-border bg-muted text-foreground text-xs font-semibold focus:border-brand focus:ring-1 focus:ring-brand outline-none"
              />
            </div>
          </div>
        )}
      </div>
    </AccordionSection>
  );
};
