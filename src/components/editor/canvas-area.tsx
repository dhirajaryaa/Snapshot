import React from 'react';
import { cn } from '@/lib/utils';
import { EditorSettings } from '@/components/presets';
import { WindowFrame } from '../window-frame';
import { IconUpload, IconSparkles, IconInfoCircle } from '@tabler/icons-react';

interface CanvasAreaProps {
  imageUrl: string | null;
  settings: EditorSettings;
  previewRef: React.RefObject<HTMLDivElement | null>;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUseSample: () => void;
  dragOver: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  getBackgroundStyles: () => React.CSSProperties;
}

export const CanvasArea: React.FC<CanvasAreaProps> = ({
  imageUrl,
  settings,
  previewRef,
  fileInputRef,
  onImageUpload,
  onUseSample,
  dragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  getBackgroundStyles
}) => {
  return (
    <section
      className="flex-1 flex flex-col items-center justify-center p-6 overflow-auto relative md:h-full bg-slate-100 dark:bg-zinc-950 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:20px_20px]"
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={onImageUpload}
        accept="image/*"
        className="hidden"
      />

      {!imageUrl ? (
        <div className="flex flex-col items-center justify-center text-center p-8 max-w-md animate-in zoom-in-95 duration-300 bg-card border border-border rounded-2xl shadow-sm z-10">
          <div className="w-16 h-16 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand mb-6 shadow-sm">
            <IconUpload className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold tracking-tight mb-2 text-foreground">Beautify Your Screenshots</h2>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Turn messy browser captures or code snippets into high-quality social mockup cards with custom frames, borders, shadows, and backgrounds.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 flex items-center justify-center space-x-2 py-3 px-5 rounded-xl text-sm font-bold text-white bg-brand hover:bg-brand-hover transition-all shadow-md"
            >
              <IconUpload className="w-4 h-4" />
              <span>Upload Screenshot</span>
            </button>
            <button
              onClick={onUseSample}
              className="flex-1 flex items-center justify-center space-x-2 py-3 px-5 rounded-xl text-sm font-bold border border-border bg-card hover:bg-accent text-card-foreground transition-all shadow-sm"
            >
              <IconSparkles className="w-4 h-4" />
              <span>Try Sample Image</span>
            </button>
          </div>

          <div className="p-3 rounded-lg border border-border bg-muted/50 flex items-start space-x-2.5 text-[11px] leading-relaxed text-muted-foreground mt-5 text-left">
            <IconInfoCircle className="w-4.5 h-4.5 text-brand shrink-0 mt-0.5" />
            <span>You can copy any screen image from Snip, Lightshot, or Chrome inspect, and hit <b>Ctrl + V</b> or <b>Cmd + V</b> to load it instantly.</span>
          </div>
        </div>
      ) : (
        /* Canvas Container wrapper representing aspect ratios */
        <div
          className={cn(
            "w-full flex items-center justify-center overflow-visible",
            dragOver && "opacity-50 scale-98 transition-all"
          )}
          style={{
            maxHeight: '74vh',
            maxWidth: '100%'
          }}
        >
          {/* Actual rendering card */}
          <div
            ref={previewRef}
            id="snapshot-capture-canvas"
            className={cn(
              "relative overflow-hidden flex items-center justify-center shadow-2xl transition-all duration-300 shrink-0",
              {
                'aspect-[1/1]': settings.aspectRatio === '1:1',
                'aspect-[16/9]': settings.aspectRatio === '16:9',
                'aspect-[4/3]': settings.aspectRatio === '4:3',
                'aspect-[9/16]': settings.aspectRatio === '9:16',
                'aspect-auto': settings.aspectRatio === 'auto'
              }
            )}
            style={{
              padding: `${settings.paddingY}px ${settings.paddingX}px`,
              ...getBackgroundStyles(),
              maxWidth: '100%',
              width: settings.aspectRatio !== 'auto' ? '680px' : undefined
            }}
          >
            {/* Custom blurred background graphic layer */}
            {settings.backgroundType === 'blur' && (
              <div
                className="absolute inset-0 bg-cover bg-center scale-110 pointer-events-none select-none transition-all duration-200"
                style={{
                  backgroundImage: `url(${imageUrl})`,
                  filter: `blur(${settings.blurRadius}px) brightness(${settings.blurBrightness}%)`
                }}
              />
            )}

            {/* Screenshot Mockup Card Container */}
            <div className="relative w-full max-h-full flex items-center justify-center z-10">
              <WindowFrame
                frameStyle={settings.frameStyle}
                browserUrl={settings.browserUrl}
                windowTitle={settings.windowTitle}
                roundness={settings.roundness}
                shadow={settings.shadow}
                cropTop={settings.cropTop}
                cropBottom={settings.cropBottom}
                cropLeft={settings.cropLeft}
                cropRight={settings.cropRight}
                screenshotScale={settings.screenshotScale}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt="Screenshot Preview"
                  className="max-w-full max-h-full block object-contain select-none"
                  style={{
                    pointerEvents: 'none'
                  }}
                />
              </WindowFrame>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
