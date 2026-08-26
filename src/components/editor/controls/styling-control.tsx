import React from 'react';
import { cn } from '@/lib/utils';
import { EditorSettings } from '@/components/presets';
import { AccordionSection } from '../accordion-section';
import { IconAdjustments } from '@tabler/icons-react';

interface StylingControlProps {
  settings: EditorSettings;
  theme: 'light' | 'dark';
  activeSection: string;
  onToggleSection: (id: string) => void;
  onUpdateSetting: <K extends keyof EditorSettings>(key: K, value: EditorSettings[K]) => void;
}

export const StylingControl: React.FC<StylingControlProps> = ({
  settings,
  theme,
  activeSection,
  onToggleSection,
  onUpdateSetting
}) => {
  return (
    <AccordionSection id="styling" title="Shadow & Corner Details" icon={IconAdjustments} activeSection={activeSection} onToggle={onToggleSection} theme={theme}>
      <div className="space-y-4">
        {/* Rounded corners */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider opacity-60">
            <span>Screenshot Roundness</span>
            <span>{settings.roundness}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="32"
            step="2"
            value={settings.roundness}
            onChange={(e) => onUpdateSetting('roundness', parseInt(e.target.value))}
            className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-brand bg-neutral-800"
          />
        </div>

        {/* Drop Shadow presets */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider opacity-60">Drop Shadow Elevation</label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { label: 'None', value: 'none' },
              { label: 'Small', value: 'sm' },
              { label: 'Medium', value: 'md' },
              { label: 'Large', value: 'lg' },
              { label: 'Extra Lg', value: 'xl' },
              { label: '2X Large', value: '2xl' }
            ].map((shad) => {
              const isSelected = settings.shadow === shad.value;
              return (
                <button
                  key={shad.value}
                  onClick={() => onUpdateSetting('shadow', shad.value as any)}
                  className={cn(
                    "py-2 px-1 rounded-lg border text-center text-[10px] font-bold transition-all",
                    isSelected
                      ? "border-brand bg-brand text-white"
                      : theme === 'dark'
                        ? "border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-neutral-400"
                        : "border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-600"
                  )}
                >
                  {shad.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </AccordionSection>
  );
};
