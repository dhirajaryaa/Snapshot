import React from 'react';
import { cn } from '@/lib/utils';
import { EditorSettings } from '@/components/presets';
import { AccordionSection } from '../accordion-section';
import { IconAdjustments } from '@tabler/icons-react';

interface StylingControlProps {
  settings: EditorSettings;
  activeSection: string;
  onToggleSection: (id: string) => void;
  onUpdateSetting: <K extends keyof EditorSettings>(key: K, value: EditorSettings[K]) => void;
}

export const StylingControl: React.FC<StylingControlProps> = ({
  settings,
  activeSection,
  onToggleSection,
  onUpdateSetting
}) => {
  return (
    <AccordionSection id="styling" title="Shadow & Corner Details" icon={IconAdjustments} activeSection={activeSection} onToggle={onToggleSection}>
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
            className="w-full h-1.5 rounded-lg cursor-pointer accent-brand bg-secondary"
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
                    "py-2 px-1 rounded-lg border text-center text-[10px] font-bold transition-all duration-200",
                    isSelected
                      ? "border-brand bg-brand text-white"
                      : "border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
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
