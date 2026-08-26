import React from 'react';
import { cn } from '@/lib/utils';
import { EditorSettings } from '@/components/presets';
import { AccordionSection } from '../accordion-section';
import { IconDownload } from '@tabler/icons-react';

interface ExportControlProps {
  settings: EditorSettings;
  activeSection: string;
  onToggleSection: (id: string) => void;
  onUpdateSetting: <K extends keyof EditorSettings>(key: K, value: EditorSettings[K]) => void;
}

export const ExportControl: React.FC<ExportControlProps> = ({
  settings,
  activeSection,
  onToggleSection,
  onUpdateSetting
}) => {
  return (
    <AccordionSection id="export" title="Export Settings" icon={IconDownload} activeSection={activeSection} onToggle={onToggleSection}>
      <div className="space-y-4">
        {/* Export format */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider opacity-60">File Format</label>
          <div className="flex rounded-lg p-0.5 bg-muted border border-border">
            {[
              { label: 'PNG (Lossless)', value: 'png' },
              { label: 'JPEG (Web-Ready)', value: 'jpeg' }
            ].map((format) => {
              const isSelected = settings.exportFormat === format.value;
              return (
                <button
                  key={format.value}
                  onClick={() => onUpdateSetting('exportFormat', format.value as any)}
                  className={cn(
                    "flex-1 py-1 text-[11px] font-bold rounded-md transition-all text-center duration-200",
                    isSelected
                      ? "bg-brand text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {format.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Resolution scale multiplier */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider opacity-60">Resolution Scale (Crispness)</label>
          <div className="flex rounded-lg p-0.5 bg-muted border border-border">
            {[
              { label: '1x (Standard)', value: 1 },
              { label: '2x (Retina/HD)', value: 2 },
              { label: '3x (Super Crisp)', value: 3 }
            ].map((scale) => {
              const isSelected = settings.exportScale === scale.value;
              return (
                <button
                  key={scale.value}
                  onClick={() => onUpdateSetting('exportScale', scale.value as any)}
                  className={cn(
                    "flex-1 py-1.5 text-[11px] font-bold rounded-md transition-all text-center duration-200",
                    isSelected
                      ? "bg-brand text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {scale.label}
                </button>
              );
            })}
          </div>
          <p className="text-[10px] opacity-60 leading-relaxed text-muted-foreground">
            Higher scales multiply pixels for high-DPI displays. E.g. 2x renders twice as clean on social media feeds.
          </p>
        </div>
      </div>
    </AccordionSection>
  );
};
