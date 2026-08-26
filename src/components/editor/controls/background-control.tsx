import React from 'react';
import { cn } from '@/lib/utils';
import { EditorSettings, BACKGROUND_PRESETS } from '@/components/presets';
import { AccordionSection } from '../accordion-section';
import { IconPhoto, IconCheck } from '@tabler/icons-react';

interface BackgroundControlProps {
  settings: EditorSettings;
  theme: 'light' | 'dark';
  activeSection: string;
  onToggleSection: (id: string) => void;
  onUpdateSetting: <K extends keyof EditorSettings>(key: K, value: EditorSettings[K]) => void;
  customSolid: string;
  setCustomSolid: (val: string) => void;
}

export const BackgroundControl: React.FC<BackgroundControlProps> = ({
  settings,
  theme,
  activeSection,
  onToggleSection,
  onUpdateSetting,
  customSolid,
  setCustomSolid
}) => {
  return (
    <AccordionSection id="background" title="Background Graphic" icon={IconPhoto} activeSection={activeSection} onToggle={onToggleSection} theme={theme}>
      <div className="space-y-4">
        {/* Selector for Background Type */}
        <div className="flex rounded-lg p-0.5 bg-neutral-900 border border-neutral-800">
          {[
            { label: 'Gradient', value: 'gradient' },
            { label: 'Solid', value: 'solid' },
            { label: 'Blur Src', value: 'blur' }
          ].map((type) => {
            const isSelected = settings.backgroundType === type.value;
            return (
              <button
                key={type.value}
                onClick={() => onUpdateSetting('backgroundType', type.value as any)}
                className={cn(
                  "flex-1 py-1 text-[11px] font-bold rounded-md transition-all text-center",
                  isSelected
                    ? "bg-brand text-white"
                    : "text-neutral-400 hover:text-neutral-200"
                )}
              >
                {type.label}
              </button>
            );
          })}
        </div>

        {/* Gradient Section */}
        {settings.backgroundType === 'gradient' && (
          <div className="space-y-4">
            <div className="flex space-x-2 border-b border-neutral-800 pb-2">
              <button
                onClick={() => onUpdateSetting('backgroundGradientMode', 'preset')}
                className={cn(
                  "text-[11px] font-bold pb-1 transition-all",
                  settings.backgroundGradientMode === 'preset' ? "text-brand border-b-2 border-brand" : "text-neutral-500 hover:text-neutral-300"
                )}
              >
                Presets
              </button>
              <button
                onClick={() => onUpdateSetting('backgroundGradientMode', 'custom')}
                className={cn(
                  "text-[11px] font-bold pb-1 transition-all",
                  settings.backgroundGradientMode === 'custom' ? "text-brand border-b-2 border-brand" : "text-neutral-500 hover:text-neutral-300"
                )}
              >
                Custom Builder
              </button>
            </div>

            {settings.backgroundGradientMode === 'preset' ? (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
                  {BACKGROUND_PRESETS.gradients.map((grad, i) => {
                    const isSelected = settings.backgroundGradient === grad.value;
                    return (
                      <button
                        key={i}
                        onClick={() => onUpdateSetting('backgroundGradient', grad.value)}
                        className={cn(
                          "h-9 w-full rounded-lg transition-transform relative hover:scale-105 border shrink-0",
                          isSelected ? "border-white ring-2 ring-brand" : "border-transparent"
                        )}
                        style={{ background: grad.value }}
                        title={grad.name}
                      >
                        {isSelected && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-lg">
                            <IconCheck className="w-4.5 h-4.5 text-white filter drop-shadow-sm" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider opacity-60">
                    <span>Preset Rotation Angle</span>
                    <span>{settings.gradientAngle}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    step="15"
                    value={settings.gradientAngle}
                    onChange={(e) => onUpdateSetting('gradientAngle', parseInt(e.target.value))}
                    className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-brand bg-neutral-800"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider opacity-60">Color Stops</label>
                  <div className="flex space-x-2">
                    <div className="flex items-center flex-1 space-x-2 bg-neutral-900 rounded-lg p-1.5 border border-neutral-800">
                      <input
                        type="color"
                        value={settings.customGradientColor1}
                        onChange={(e) => onUpdateSetting('customGradientColor1', e.target.value)}
                        className="w-6 h-6 rounded cursor-pointer border border-neutral-700 bg-transparent shrink-0"
                      />
                      <input
                        type="text"
                        value={settings.customGradientColor1.toUpperCase()}
                        onChange={(e) => {
                          if (e.target.value.startsWith('#') && e.target.value.length <= 7) {
                            onUpdateSetting('customGradientColor1', e.target.value);
                          }
                        }}
                        className="flex-1 bg-transparent border-none text-[10px] font-mono outline-none text-neutral-300 w-full"
                      />
                    </div>
                    <div className="flex items-center flex-1 space-x-2 bg-neutral-900 rounded-lg p-1.5 border border-neutral-800">
                      <input
                        type="color"
                        value={settings.customGradientColor2}
                        onChange={(e) => onUpdateSetting('customGradientColor2', e.target.value)}
                        className="w-6 h-6 rounded cursor-pointer border border-neutral-700 bg-transparent shrink-0"
                      />
                      <input
                        type="text"
                        value={settings.customGradientColor2.toUpperCase()}
                        onChange={(e) => {
                          if (e.target.value.startsWith('#') && e.target.value.length <= 7) {
                            onUpdateSetting('customGradientColor2', e.target.value);
                          }
                        }}
                        className="flex-1 bg-transparent border-none text-[10px] font-mono outline-none text-neutral-300 w-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider opacity-60">Gradient Type</label>
                  <div className="flex rounded-lg p-0.5 bg-neutral-900 border border-neutral-800">
                    <button
                      onClick={() => onUpdateSetting('customGradientType', 'linear')}
                      className={cn("flex-1 py-1 text-[11px] font-bold rounded-md transition-all text-center", settings.customGradientType === 'linear' ? "bg-neutral-700 text-white" : "text-neutral-500")}
                    >Linear</button>
                    <button
                      onClick={() => onUpdateSetting('customGradientType', 'radial')}
                      className={cn("flex-1 py-1 text-[11px] font-bold rounded-md transition-all text-center", settings.customGradientType === 'radial' ? "bg-neutral-700 text-white" : "text-neutral-500")}
                    >Radial</button>
                  </div>
                </div>

                {settings.customGradientType === 'linear' && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider opacity-60">
                      <span>Custom Angle</span>
                      <span>{settings.customGradientAngle}°</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      step="5"
                      value={settings.customGradientAngle}
                      onChange={(e) => onUpdateSetting('customGradientAngle', parseInt(e.target.value))}
                      className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-brand bg-neutral-800"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Solid Color Section */}
        {settings.backgroundType === 'solid' && (
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-2">
              {BACKGROUND_PRESETS.solids.map((solid, i) => {
                const isSelected = settings.backgroundColor === solid.value;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      onUpdateSetting('backgroundColor', solid.value);
                      setCustomSolid(solid.value);
                    }}
                    className={cn(
                      "h-8 w-full rounded-lg transition-transform relative hover:scale-105 border",
                      isSelected ? "border-white ring-2 ring-brand" : "border-transparent"
                    )}
                    style={{ backgroundColor: solid.value }}
                    title={solid.name}
                  >
                    {isSelected && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-lg">
                        <IconCheck className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Custom color picker */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider opacity-60">Custom Solid Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={customSolid}
                  onChange={(e) => {
                    setCustomSolid(e.target.value);
                    onUpdateSetting('backgroundColor', e.target.value);
                  }}
                  className="w-8 h-8 rounded cursor-pointer border border-neutral-700 bg-transparent"
                />
                <input
                  type="text"
                  value={customSolid.toUpperCase()}
                  onChange={(e) => {
                    if (e.target.value.startsWith('#') && e.target.value.length <= 7) {
                      setCustomSolid(e.target.value);
                      onUpdateSetting('backgroundColor', e.target.value);
                    }
                  }}
                  className={cn(
                    "flex-1 px-2.5 py-1.5 rounded-lg border text-xs font-mono uppercase",
                    theme === 'dark'
                      ? "bg-neutral-900 border-neutral-800 text-neutral-200"
                      : "bg-neutral-50 border-neutral-200 text-neutral-700"
                  )}
                />
              </div>
            </div>
          </div>
        )}

        {/* Blur Image Background */}
        {settings.backgroundType === 'blur' && (
          <div className="space-y-4">
            <div className={cn(
              "p-3 rounded-lg border text-[11px] opacity-80 leading-relaxed mb-2",
              theme === 'dark' ? "bg-neutral-900/40 border-neutral-800 text-neutral-400" : "bg-neutral-50 border-neutral-200 text-neutral-600"
            )}>
              <span>Your uploaded screenshot itself will be heavily blurred and stretched to create a modern, color-matched backplate.</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider opacity-60">
                <span>Blur Radius</span>
                <span>{settings.blurRadius}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="64"
                step="2"
                value={settings.blurRadius}
                onChange={(e) => onUpdateSetting('blurRadius', parseInt(e.target.value))}
                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-brand bg-neutral-800"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider opacity-60">
                <span>Background Brightness</span>
                <span>{settings.blurBrightness}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="150"
                step="5"
                value={settings.blurBrightness}
                onChange={(e) => onUpdateSetting('blurBrightness', parseInt(e.target.value))}
                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-brand bg-neutral-800"
              />
            </div>
          </div>
        )}
      </div>
    </AccordionSection>
  );
};
