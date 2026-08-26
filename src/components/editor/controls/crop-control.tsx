import React from 'react';
import { cn } from '@/lib/utils';
import { EditorSettings } from '@/components/presets';
import { AccordionSection } from '../accordion-section';
import { IconCrop } from '@tabler/icons-react';

interface CropControlProps {
  settings: EditorSettings;
  activeSection: string;
  onToggleSection: (id: string) => void;
  onUpdateSetting: <K extends keyof EditorSettings>(key: K, value: EditorSettings[K]) => void;
}

export const CropControl: React.FC<CropControlProps> = ({
  settings,
  activeSection,
  onToggleSection,
  onUpdateSetting
}) => {
  const handleResetCrop = () => {
    onUpdateSetting('cropTop', 0);
    onUpdateSetting('cropBottom', 0);
    onUpdateSetting('cropLeft', 0);
    onUpdateSetting('cropRight', 0);
    onUpdateSetting('screenshotScale', 100);
  };

  return (
    <AccordionSection id="crop" title="Crop & Scale" icon={IconCrop} activeSection={activeSection} onToggle={onToggleSection}>
      <div className="space-y-4">
        {/* Screenshot Scale / Zoom */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider opacity-60">
            <span>Scale / Zoom</span>
            <span>{settings.screenshotScale}%</span>
          </div>
          <input
            type="range"
            min="50"
            max="150"
            step="1"
            value={settings.screenshotScale}
            onChange={(e) => onUpdateSetting('screenshotScale', parseInt(e.target.value))}
            className="w-full h-1.5 rounded-lg cursor-pointer accent-brand bg-secondary"
          />
        </div>

        {/* Crop Margins Title */}
        <div className="flex justify-between items-center pt-2 border-t border-border">
          <span className="text-[11px] font-bold uppercase tracking-wider opacity-60">Crop Margins</span>
          <button
            onClick={handleResetCrop}
            className="text-[10px] text-brand hover:underline font-semibold"
          >
            Reset
          </button>
        </div>

        {/* Crop Top */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[10px] opacity-75 font-semibold">
            <span>Crop Top</span>
            <span>{settings.cropTop}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="80"
            step="1"
            value={settings.cropTop}
            onChange={(e) => onUpdateSetting('cropTop', parseInt(e.target.value))}
            className="w-full h-1.5 rounded-lg cursor-pointer accent-brand bg-secondary"
          />
        </div>

        {/* Crop Bottom */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[10px] opacity-75 font-semibold">
            <span>Crop Bottom</span>
            <span>{settings.cropBottom}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="80"
            step="1"
            value={settings.cropBottom}
            onChange={(e) => onUpdateSetting('cropBottom', parseInt(e.target.value))}
            className="w-full h-1.5 rounded-lg cursor-pointer accent-brand bg-secondary"
          />
        </div>

        {/* Crop Left */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[10px] opacity-75 font-semibold">
            <span>Crop Left</span>
            <span>{settings.cropLeft}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="80"
            step="1"
            value={settings.cropLeft}
            onChange={(e) => onUpdateSetting('cropLeft', parseInt(e.target.value))}
            className="w-full h-1.5 rounded-lg cursor-pointer accent-brand bg-secondary"
          />
        </div>

        {/* Crop Right */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[10px] opacity-75 font-semibold">
            <span>Crop Right</span>
            <span>{settings.cropRight}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="80"
            step="1"
            value={settings.cropRight}
            onChange={(e) => onUpdateSetting('cropRight', parseInt(e.target.value))}
            className="w-full h-1.5 rounded-lg cursor-pointer accent-brand bg-secondary"
          />
        </div>
      </div>
    </AccordionSection>
  );
};
