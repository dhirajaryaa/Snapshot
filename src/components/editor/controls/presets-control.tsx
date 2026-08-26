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
  theme: 'light' | 'dark';
  activeSection: string;
  onToggleSection: (id: string) => void;
  onApplyPreset: (preset: Preset) => void;
}

export const PresetsControl: React.FC<PresetsControlProps> = ({
  settings,
  theme,
  activeSection,
  onToggleSection,
  onApplyPreset
}) => {
  return (
    <AccordionSection id="presets" title="Presets & Sizes" icon={IconStack2} activeSection={activeSection} onToggle={onToggleSection} theme={theme}>
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
                  ? "border-brand bg-brand/10 text-neutral-100"
                  : theme === 'dark'
                    ? "border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200"
                    : "border-neutral-200 bg-neutral-50 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800"
              )}
            >
              <div className="flex items-center space-x-2.5">
                {preset.id === 'twitter-x' && <IconBrandX className="w-3.5 h-3.5 text-neutral-200" />}
                {preset.id === 'instagram-post' && <IconBrandInstagram className="w-3.5 h-3.5 text-[#E1306C]" />}
                {preset.id === 'linkedin-post' && <IconBrandLinkedin className="w-3.5 h-3.5 text-[#0077B5]" />}
                {preset.id === 'product-hunt' && <IconBrandProducthunt className="w-3.5 h-3.5 text-[#DA552F]" />}
                {preset.id === 'dribbble-shot' && <IconBrandDribbble className="w-3.5 h-3.5 text-[#EA4C89]" />}
                {preset.id !== 'twitter-x' && preset.id !== 'instagram-post' && preset.id !== 'linkedin-post' && preset.id !== 'product-hunt' && preset.id !== 'dribbble-shot' && (
                  <IconPhoto className="w-3.5 h-3.5 text-indigo-500" />
                )}
                <span>{preset.name}</span>
              </div>
              {isSelected && <IconCheck className="w-3.5 h-3.5 text-brand-light" />}
            </button>
          );
        })}
      </div>
    </AccordionSection>
  );
};
