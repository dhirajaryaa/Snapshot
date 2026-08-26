import React from 'react';
import { cn } from '@/lib/utils';
import { EditorSettings, Preset, SOCIAL_PRESETS } from '@/components/presets';
import { AccordionSection } from '../accordion-section';
import {
  IconStack2,
  IconBrandX,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandProducthunt,
  IconBrandDribbble,
  IconPhoto,
  IconCheck
} from '@tabler/icons-react';

interface PresetsControlProps {
  settings: EditorSettings;
  activeSection: string;
  onToggleSection: (id: string) => void;
  onApplyPreset: (preset: Preset) => void;
}

export const PresetsControl: React.FC<PresetsControlProps> = ({
  settings,
  activeSection,
  onToggleSection,
  onApplyPreset
}) => {
  return (
    <AccordionSection id="presets" title="Presets & Sizes" icon={IconStack2} activeSection={activeSection} onToggle={onToggleSection}>
      <div className="grid grid-cols-1 gap-2">
        {SOCIAL_PRESETS.map((preset) => {
          const isSelected = settings.aspectRatio === preset.settings.aspectRatio &&
            settings.frameStyle === preset.settings.frameStyle;
          return (
            <button
              key={preset.id}
              onClick={() => onApplyPreset(preset)}
              className={cn(
                "w-full flex items-center justify-between p-3 rounded-lg border text-left text-xs font-semibold transition-all duration-200",
                isSelected
                  ? "border-brand bg-brand/10 text-brand"
                  : "border-border bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <div className="flex items-center space-x-2.5">
                {preset.id === 'twitter-x' && <IconBrandX className="w-3.5 h-3.5 text-foreground" />}
                {preset.id === 'instagram-post' && <IconBrandInstagram className="w-3.5 h-3.5 text-[#E1306C]" />}
                {preset.id === 'linkedin-post' && <IconBrandLinkedin className="w-3.5 h-3.5 text-[#0077B5]" />}
                {preset.id === 'product-hunt' && <IconBrandProducthunt className="w-3.5 h-3.5 text-[#DA552F]" />}
                {preset.id === 'dribbble-shot' && <IconBrandDribbble className="w-3.5 h-3.5 text-[#EA4C89]" />}
                {preset.id !== 'twitter-x' && preset.id !== 'instagram-post' && preset.id !== 'linkedin-post' && preset.id !== 'product-hunt' && preset.id !== 'dribbble-shot' && (
                  <IconPhoto className="w-3.5 h-3.5 text-brand" />
                )}
                <span>{preset.name}</span>
              </div>
              {isSelected && <IconCheck className="w-3.5 h-3.5 text-brand" />}
            </button>
          );
        })}
      </div>
    </AccordionSection>
  );
};
