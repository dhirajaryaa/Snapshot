import React from 'react';
import { cn } from '@/lib/utils';
import { EditorSettings } from '@/components/presets';
import { AccordionSection } from '../accordion-section';
import { IconDeviceDesktop } from '@tabler/icons-react';

interface LayoutControlProps {
  settings: EditorSettings;
  activeSection: string;
  onToggleSection: (id: string) => void;
  onUpdateSetting: <K extends keyof EditorSettings>(key: K, value: EditorSettings[K]) => void;
}

export const LayoutControl: React.FC<LayoutControlProps> = ({
  settings,
  activeSection,
  onToggleSection,
  onUpdateSetting
}) => {
  return (
    <AccordionSection id="canvas" title="Canvas & Ratio" icon={IconDeviceDesktop} activeSection={activeSection} onToggle={onToggleSection}>
      <div className="space-y-4.5">
        {/* Aspect Ratio */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider opacity-60">Aspect Ratio</label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { label: 'Auto', value: 'auto' },
              { label: '1:1 Square', value: '1:1' },
              { label: '16:9 HD', value: '16:9' },
              { label: '4:3 Standard', value: '4:3' },
              { label: '9:16 Story', value: '9:16' }
            ].map((ratio) => {
              const isSelected = settings.aspectRatio === ratio.value;
              return (
                <button
                  key={ratio.value}
                  onClick={() => onUpdateSetting('aspectRatio', ratio.value as any)}
                  className={cn(
                    "py-2 px-1 rounded-lg border text-center text-[10px] font-bold transition-all duration-200",
                    isSelected
                      ? "border-brand bg-brand text-white"
                      : "border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  {ratio.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Padding Sliders */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider opacity-60">
              <span>Horizontal Padding (X)</span>
              <span>{settings.paddingX}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="160"
              step="4"
              value={settings.paddingX}
              onChange={(e) => onUpdateSetting('paddingX', parseInt(e.target.value))}
              className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-brand bg-muted"
            />
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider opacity-60">
              <span>Vertical Padding (Y)</span>
              <span>{settings.paddingY}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="160"
              step="4"
              value={settings.paddingY}
              onChange={(e) => onUpdateSetting('paddingY', parseInt(e.target.value))}
              className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-brand bg-muted"
            />
          </div>
        </div>
      </div>
    </AccordionSection>
  );
};
