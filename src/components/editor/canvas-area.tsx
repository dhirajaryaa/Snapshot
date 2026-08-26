import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { EditorSettings } from '@/components/presets';
import { WindowFrame } from '../window-frame';
import { IconUpload, IconSparkles, IconInfoCircle, IconZoomIn, IconZoomOut } from '@tabler/icons-react';

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
  // Infinite Canvas State
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [isSpacePressed, setIsSpacePressed] = useState(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLElement>(null);

  // Handle Spacebar detection for panning
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && (e.target === document.body || (e.target as HTMLElement).tagName === 'SECTION')) {
        e.preventDefault();
        setIsSpacePressed(true);
        document.body.style.cursor = 'grab';
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setIsSpacePressed(false);
        setIsPanning(false);
        document.body.style.cursor = 'default';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      document.body.style.cursor = 'default';
    };
  }, []);

  // Native Non-Passive Wheel Event Listener to prevent Browser Default Zooming (Ctrl+Scroll)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheelNative = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault(); // Prevents browser page zoom
        const zoomSensitivity = 0.003;
        setScale(prevScale => Math.min(Math.max(0.2, prevScale - e.deltaY * zoomSensitivity), 3));
      } else if (isSpacePressed) {
        e.preventDefault();
      } else {
        // Pan with normal scroll wheel
        setPosition(prev => ({
          x: prev.x - e.deltaX,
          y: prev.y - e.deltaY
        }));
      }
    };

    container.addEventListener('wheel', handleWheelNative, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheelNative);
    };
  }, [isSpacePressed]);

  // Pointer events for dragging
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!imageUrl) return;

    // Middle click OR Left click + Space
    if (e.button === 1 || (e.button === 0 && isSpacePressed)) {
      e.preventDefault();
      setIsPanning(true);
      document.body.style.cursor = 'grabbing';
      lastPointer.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isPanning) {
      e.preventDefault();
      const dx = e.clientX - lastPointer.current.x;
      const dy = e.clientY - lastPointer.current.y;
      setPosition(prev => ({ x: prev.x + dx, y: prev.y + dy }));
      lastPointer.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handlePointerUp = () => {
    if (isPanning) {
      setIsPanning(false);
      document.body.style.cursor = isSpacePressed ? 'grab' : 'default';
    }
  };

  const resetCanvasView = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <section
      ref={containerRef}
      className={cn(
        "flex-1 flex flex-col items-center justify-center overflow-hidden relative md:h-full bg-muted bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:20px_20px]",
        isSpacePressed ? "cursor-grab" : "cursor-default"
      )}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
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
        <div className="flex flex-col items-center justify-center text-center p-8 max-w-md animate-in zoom-in-95 duration-300 bg-card border border-border rounded-2xl shadow-sm z-10 mx-4">
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
        <>
          {/* Canvas View Tools (Zoom Reset) */}
          <div className="absolute bottom-6 right-6 z-20 flex items-center bg-card border border-border rounded-lg shadow-sm overflow-hidden select-none">
            <button
              onClick={() => setScale(s => Math.max(0.2, s - 0.1))}
              className="p-2 hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
              title="Zoom Out"
            >
              <IconZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={resetCanvasView}
              className="px-3 py-2 text-[10px] font-bold border-x border-border hover:bg-accent text-muted-foreground hover:text-foreground transition-colors min-w-[50px] text-center"
              title="Reset Zoom & Pan"
            >
              {Math.round(scale * 100)}%
            </button>
            <button
              onClick={() => setScale(s => Math.min(3, s + 0.1))}
              className="p-2 hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
              title="Zoom In"
            >
              <IconZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Canvas Container wrapper representing aspect ratios and panning */}
          <div
            className={cn(
              "w-full flex items-center justify-center overflow-visible",
              dragOver && "opacity-50 transition-all",
              isPanning ? "pointer-events-none" : ""
            )}
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transformOrigin: 'center center',
              transition: isPanning ? 'none' : 'transform 0.1s ease-out'
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
                    className="max-w-full max-h-full block object-contain select-none pointer-events-none"
                    draggable={false}
                  />
                </WindowFrame>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};
