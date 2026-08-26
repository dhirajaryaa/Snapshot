'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  IconUpload,
  IconDownload,
  IconCopy,
  IconSun,
  IconMoon,
  IconSparkles,
  IconRefresh,
  IconScreenshot,
  IconClipboard,
  IconInfoCircle
} from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { WindowFrame } from './window-frame';
import {
  DEFAULT_SETTINGS,
  EditorSettings,
  Preset
} from './presets';

// Import split control components
import { PresetsControl } from './editor/controls/presets-control';
import { LayoutControl } from './editor/controls/layout-control';
import { BackgroundControl } from './editor/controls/background-control';
import { FrameControl } from './editor/controls/frame-control';
import { StylingControl } from './editor/controls/styling-control';
import { ExportControl } from './editor/controls/export-control';

import { toPng, toJpeg } from 'html-to-image';

// Default mockup screen data URL
const SAMPLE_IMAGE = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="480" viewBox="0 0 800 480"><rect width="800" height="480" fill="%230c1020"/><rect x="40" y="40" width="720" height="400" rx="8" fill="%23131930" stroke="%231d274f" stroke-width="1"/><circle cx="70" cy="65" r="6" fill="%23ef4444"/><circle cx="90" cy="65" r="6" fill="%23f59e0b"/><circle cx="110" cy="65" r="6" fill="%2310b981"/><text x="50" y="110" fill="%23192d75" font-family="monospace" font-size="13" font-weight="bold">// Welcome to Snapshot!</text><text x="50" y="140" fill="%236366f1" font-family="monospace" font-size="13" font-weight="bold">const</text><text x="95" y="140" fill="%23e2e8f0" font-family="monospace" font-size="13">snapshot</text><text x="165" y="140" fill="%236366f1" font-family="monospace" font-size="13">=</text><text x="180" y="140" fill="%2338bdf8" font-family="monospace" font-size="13">beautify</text><text x="245" y="140" fill="%23e2e8f0" font-family="monospace" font-size="13">(screenshot) =&gt; {</text><text x="80" y="170" fill="%236366f1" font-family="monospace" font-size="13">return</text><text x="135" y="170" fill="%23e2e8f0" font-family="monospace" font-size="13">{ ...screenshot, style: </text><text x="310" y="170" fill="%2310b981" font-family="monospace" font-size="13">'amazing'</text><text x="385" y="170" fill="%23e2e8f0" font-family="monospace" font-size="13"> };</text><text x="50" y="200" fill="%23e2e8f0" font-family="monospace" font-size="13">};</text><text x="50" y="240" fill="%236366f1" font-family="monospace" font-size="13">export default</text><text x="165" y="240" fill="%2338bdf8" font-family="monospace" font-size="13">beautify</text><text x="230" y="240" fill="%23e2e8f0" font-family="monospace" font-size="13">;</text><rect x="50" y="280" width="700" height="130" rx="6" fill="%23090d16" stroke="%23171e36" stroke-width="1"/><text x="70" y="315" fill="%2364748b" font-family="monospace" font-size="12">$ bun run dev</text><text x="70" y="345" fill="%2310b981" font-family="monospace" font-size="12">✓ Snapshot is running on http://localhost:3000</text><text x="70" y="375" fill="%2338bdf8" font-family="monospace" font-size="12">ℹ Drag &amp; drop your screenshot or paste directly here to begin!</text></svg>`;

export function SnapshotEditor() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [settings, setSettings] = useState<EditorSettings>(DEFAULT_SETTINGS);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [activeSection, setActiveSection] = useState<string>('presets');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [customSolid, setCustomSolid] = useState<string>('#192d75');
  const [dragOver, setDragOver] = useState<boolean>(false);

  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle toast notifications
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Keyboard paste listener
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const blob = items[i].getAsFile();
          if (blob) {
            const reader = new FileReader();
            reader.onload = (event) => {
              if (event.target?.result) {
                setImageUrl(event.target.result as string);
                showToast('Image pasted from clipboard!', 'success');
              }
            };
            reader.readAsDataURL(blob);
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  // Set brand theme styling in index
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Load sample image
  const handleUseSample = () => {
    setImageUrl(SAMPLE_IMAGE);
    showToast('Loaded sample screenshot!', 'info');
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageUrl(event.target.result as string);
          showToast('Screenshot uploaded successfully!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageUrl(event.target.result as string);
          showToast('Screenshot dropped and loaded!');
        }
      };
      reader.readAsDataURL(file);
    } else {
      showToast('Please drop an image file.', 'error');
    }
  };

  // Apply social platform preset
  const applyPreset = (preset: Preset) => {
    setSettings((prev) => ({
      ...prev,
      ...preset.settings
    }));
    showToast(`Applied ${preset.name} preset!`, 'success');
  };

  // Update specific setting value
  const updateSetting = <K extends keyof EditorSettings>(key: K, value: EditorSettings[K]) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  // Trigger file dialog
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Reset all editor parameters to default
  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    setCustomSolid('#192d75');
    showToast('Settings reset to defaults', 'info');
  };

  // Generate Image helper
  const renderImage = async (format: 'png' | 'jpeg', scale: 1 | 2 | 3): Promise<string | null> => {
    if (!previewRef.current) return null;
    setIsExporting(true);

    try {
      const options = {
        pixelRatio: scale,
        skipWorkaround: true,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
          width: previewRef.current.offsetWidth + 'px',
          height: previewRef.current.offsetHeight + 'px'
        }
      };

      let dataUrl = '';
      if (format === 'png') {
        dataUrl = await toPng(previewRef.current, options);
      } else {
        dataUrl = await toJpeg(previewRef.current, { ...options, quality: 0.95 });
      }
      return dataUrl;
    } catch (error) {
      console.error('Export failed:', error);
      showToast('Export failed. Please check image permissions or retry.', 'error');
      return null;
    } finally {
      setIsExporting(false);
    }
  };

  // Download Image
  const handleDownload = async () => {
    const dataUrl = await renderImage(settings.exportFormat, settings.exportScale);
    if (!dataUrl) return;

    const link = document.createElement('a');
    link.download = `snapshot-${Date.now()}.${settings.exportFormat}`;
    link.href = dataUrl;
    link.click();
    showToast(`Downloaded ${settings.exportFormat.toUpperCase()} at ${settings.exportScale}x scale!`, 'success');
  };

  // Copy Image to Clipboard
  const handleCopyToClipboard = async () => {
    if (!previewRef.current) return;
    setIsExporting(true);

    try {
      const options = {
        pixelRatio: settings.exportScale,
        skipWorkaround: true
      };

      const blob = await new Promise<Blob | null>((resolve, reject) => {
        toPng(previewRef.current!, options)
          .then((dataUrl) => {
            fetch(dataUrl)
              .then((res) => res.blob())
              .then(resolve)
              .catch(reject);
          })
          .catch(reject);
      });

      if (blob) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        showToast('Image copied to clipboard! Ready to share.', 'success');
      } else {
        throw new Error('Blob generation failed');
      }
    } catch (error) {
      console.error('Clipboard copy failed:', error);
      showToast('Unable to copy to clipboard automatically. Try downloading instead.', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  // Toggle sections
  const handleToggleSection = (section: string) => {
    setActiveSection(section);
  };

  // CSS values for background container
  const getBackgroundStyles = (): React.CSSProperties => {
    if (settings.backgroundType === 'solid') {
      return { backgroundColor: settings.backgroundColor };
    }
    if (settings.backgroundType === 'gradient') {
      let gradientStr = settings.backgroundGradient;
      if (gradientStr.startsWith('linear-gradient')) {
        gradientStr = gradientStr.replace(/\d+deg/, `${settings.gradientAngle}deg`);
      }
      return { background: gradientStr };
    }
    return { backgroundColor: '#18181b' };
  };

  return (
    <div className={cn(
      "min-h-screen w-full flex flex-col font-sans transition-colors duration-300",
      theme === 'dark' ? "bg-[#09090b] text-[#fafafa]" : "bg-[#f4f4f5] text-[#09090b]"
    )}>
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-center space-x-2.5 px-4 py-3 rounded-lg shadow-xl border animate-in slide-in-from-top-4 duration-300 bg-[#121216] border-brand text-[#f8fafc]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}

      {/* Header bar */}
      <header className={cn(
        "h-16 flex items-center justify-between px-6 border-b shrink-0",
        theme === 'dark' ? "bg-[#0e0e11] border-neutral-800" : "bg-white border-neutral-200"
      )}>
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white bg-brand shadow-sm">
            <IconSparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">Snapshot</h1>
            <p className="text-[10px] opacity-60 -mt-1 font-medium hidden sm:block">Turn screenshots into beautiful, share-ready visuals.</p>
          </div>
        </div>

        {/* Global Toolbar */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={cn(
              "p-2 rounded-lg border transition-all duration-200 hover:scale-105",
              theme === 'dark'
                ? "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white"
                : "bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
            )}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <IconSun className="w-4 h-4" /> : <IconMoon className="w-4 h-4" />}
          </button>

          {imageUrl && (
            <button
              onClick={handleReset}
              className={cn(
                "hidden sm:flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all duration-200",
                theme === 'dark'
                  ? "bg-neutral-900 border-neutral-800 hover:bg-neutral-800 text-neutral-400"
                  : "bg-white border-neutral-200 hover:bg-neutral-50 text-neutral-600"
              )}
            >
              <IconRefresh className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

          {imageUrl && (
            <button
              onClick={triggerFileInput}
              className={cn(
                "hidden md:flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-bold border transition-all duration-200",
                theme === 'dark'
                  ? "bg-brand/10 border-brand/30 text-brand-light hover:bg-brand/20"
                  : "bg-neutral-100 border-neutral-200 text-neutral-700 hover:bg-neutral-200"
              )}
            >
              <IconUpload className="w-3.5 h-3.5" />
              <span>Upload New</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Side: Controls Panel */}
        <section className={cn(
          "w-full md:w-80 border-r flex flex-col overflow-y-auto shrink-0 md:h-full select-none",
          theme === 'dark' ? "bg-[#0e0e11] border-neutral-800" : "bg-white border-neutral-200"
        )}>
          {/* Action trigger when no image uploaded */}
          {!imageUrl ? (
            <div className="p-5 flex-1 flex flex-col justify-center space-y-4">
              <div className={cn(
                "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200",
                dragOver
                  ? "border-brand bg-brand/5 scale-95"
                  : theme === 'dark' ? "border-neutral-800 hover:border-neutral-700 bg-neutral-900/30" : "border-neutral-300 hover:border-neutral-400 bg-neutral-50",
              )}
                onClick={triggerFileInput}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <IconUpload className="w-8 h-8 mx-auto text-neutral-400 mb-3" />
                <p className="text-sm font-semibold mb-1">Click to upload screenshot</p>
                <p className="text-[11px] opacity-50">Drag & drop or paste from clipboard here</p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              <div className="text-center py-2 text-xs opacity-40">— OR —</div>

              <button
                onClick={handleUseSample}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-brand hover:bg-brand-hover transition-all shadow-md"
              >
                <IconSparkles className="w-4 h-4" />
                <span>Use Sample Screenshot</span>
              </button>

              <div className={cn(
                "p-3 rounded-lg border flex items-start space-x-2.5 text-[11px] opacity-75 leading-relaxed",
                theme === 'dark' ? "bg-neutral-900/50 border-neutral-800 text-neutral-400" : "bg-neutral-50 border-neutral-200 text-neutral-600"
              )}>
                <IconInfoCircle className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                <span>You can copy any screen image from Snip, Lightshot, or Chrome inspect, and hit <b>Ctrl + V</b> or <b>Cmd + V</b> to load it instantly.</span>
              </div>
            </div>
          ) : (
            <div className="flex-1">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />

              {/* 1. Presets */}
              <PresetsControl
                settings={settings}
                theme={theme}
                activeSection={activeSection}
                onToggleSection={handleToggleSection}
                onApplyPreset={applyPreset}
              />

              {/* 2. Aspect Ratio & Canvas Size */}
              <LayoutControl
                settings={settings}
                theme={theme}
                activeSection={activeSection}
                onToggleSection={handleToggleSection}
                onUpdateSetting={updateSetting}
              />

              {/* 3. Background Settings */}
              <BackgroundControl
                settings={settings}
                theme={theme}
                activeSection={activeSection}
                onToggleSection={handleToggleSection}
                onUpdateSetting={updateSetting}
                customSolid={customSolid}
                setCustomSolid={setCustomSolid}
              />

              {/* 4. Frame settings */}
              <FrameControl
                settings={settings}
                theme={theme}
                activeSection={activeSection}
                onToggleSection={handleToggleSection}
                onUpdateSetting={updateSetting}
              />

              {/* 5. Styling Properties */}
              <StylingControl
                settings={settings}
                theme={theme}
                activeSection={activeSection}
                onToggleSection={handleToggleSection}
                onUpdateSetting={updateSetting}
              />

              {/* 6. Export Panel */}
              <ExportControl
                settings={settings}
                theme={theme}
                activeSection={activeSection}
                onToggleSection={handleToggleSection}
                onUpdateSetting={updateSetting}
              />
            </div>
          )}

          {/* Bottom branding footer */}
          <div className={cn(
            "p-4 border-t text-center text-[10px] opacity-40 select-none mt-auto",
            theme === 'dark' ? "border-neutral-800 bg-[#0c0c0f]" : "border-neutral-200 bg-neutral-50"
          )}>
            Snapshot &copy; 2026. Made with ❤️
          </div>
        </section>

        {/* Right Side: Preview Work area */}
        <section className={cn(
          "flex-1 flex flex-col items-center justify-between p-6 overflow-auto relative md:h-full",
          theme === 'dark'
            ? "bg-[#121215] bg-[radial-gradient(#1e1e24_1px,transparent_1px)] [background-size:20px_20px]"
            : "bg-[#e4e4e7] bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] [background-size:20px_20px]"
        )}>
          {/* Top workspace toolbar */}
          {imageUrl && (
            <div className={cn(
              "w-full max-w-4xl flex items-center justify-between p-2 rounded-xl mb-4 text-xs font-semibold shadow-sm border shrink-0 z-10",
              theme === 'dark' ? "bg-neutral-900/90 border-neutral-800" : "bg-white/95 border-neutral-200"
            )}>
              <div className="flex items-center space-x-2 px-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="opacity-80">Workspace Active</span>
              </div>
              <div className="flex items-center space-x-2">
                {/* Change photo button */}
                <button
                  onClick={triggerFileInput}
                  className={cn(
                    "flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border transition-all duration-200",
                    theme === 'dark'
                      ? "bg-neutral-800 border-neutral-700 hover:bg-neutral-700 text-neutral-300"
                      : "bg-neutral-100 border-neutral-200 hover:bg-neutral-200 text-neutral-700"
                  )}
                >
                  <IconScreenshot className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Swap Screenshot</span>
                </button>

                <button
                  onClick={handleCopyToClipboard}
                  disabled={isExporting}
                  className={cn(
                    "flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg border font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
                    theme === 'dark'
                      ? "bg-neutral-800 border-neutral-700 hover:bg-neutral-700 text-neutral-300"
                      : "bg-neutral-100 border-neutral-200 hover:bg-neutral-200 text-neutral-700"
                  )}
                >
                  {isExporting ? (
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-brand border-t-transparent animate-spin" />
                  ) : (
                    <IconCopy className="w-3.5 h-3.5" />
                  )}
                  <span>Copy to Clipboard</span>
                </button>

                <button
                  onClick={handleDownload}
                  disabled={isExporting}
                  className="flex items-center space-x-1.5 px-4 py-1.5 rounded-lg text-white bg-brand hover:bg-brand-hover font-bold transition-all duration-200 shadow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isExporting ? (
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  ) : (
                    <IconDownload className="w-3.5 h-3.5" />
                  )}
                  <span>Download</span>
                </button>
              </div>
            </div>
          )}

          {/* Interactive Workspace Canvas */}
          <div className="flex-1 w-full flex items-center justify-center p-4">
            {!imageUrl ? (
              <div className="flex flex-col items-center justify-center text-center p-8 max-w-md animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-2xl bg-brand/10 border border-brand/30 flex items-center justify-center text-brand-light mb-6 shadow-md shadow-brand/5">
                  <IconUpload className="w-7 h-7" />
                </div>
                <h2 className="text-xl font-bold tracking-tight mb-2">Beautify Your Screenshots</h2>
                <p className="text-sm opacity-60 mb-6 leading-relaxed">
                  Turn messy browser captures or code snippets into high-quality social mockup cards with custom frames, borders, shadows, and backgrounds.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
                  <button
                    onClick={triggerFileInput}
                    className="flex-1 flex items-center justify-center space-x-2 py-3 px-5 rounded-xl text-sm font-bold text-white bg-brand hover:bg-brand-hover transition-all shadow-md"
                  >
                    <IconUpload className="w-4 h-4" />
                    <span>Upload Screenshot</span>
                  </button>
                  <button
                    onClick={handleUseSample}
                    className={cn(
                      "flex-1 flex items-center justify-center space-x-2 py-3 px-5 rounded-xl text-sm font-bold border transition-all",
                      theme === 'dark'
                        ? "bg-neutral-900 border-neutral-800 hover:bg-neutral-800 text-neutral-300"
                        : "bg-white border-neutral-200 hover:bg-neutral-50 text-neutral-700"
                    )}
                  >
                    <IconSparkles className="w-4 h-4" />
                    <span>Try Sample Image</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Canvas Container wrapper representing the physical constraints of selected aspectRatio */
              <div
                className="w-full flex items-center justify-center overflow-visible"
                style={{
                  maxHeight: '68vh',
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
                      className="absolute inset-0 bg-cover bg-center filter blur-3xl brightness-75 scale-110 pointer-events-none select-none transition-all duration-200"
                      style={{ backgroundImage: `url(${imageUrl})` }}
                    />
                  )}

                  {/* Screenshot Mockup Card Container */}
                  <div className="relative w-full max-h-full flex items-center justify-center z-10">
                    <WindowFrame
                      frameStyle={settings.frameStyle}
                      browserUrl={settings.browserUrl}
                      roundness={settings.roundness}
                      shadow={settings.shadow}
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
          </div>

          {/* Quick paste helper info bar at bottom */}
          {imageUrl && (
            <div className={cn(
              "w-full max-w-4xl mt-4 p-3 rounded-lg border text-[11px] leading-relaxed opacity-60 flex items-center space-x-2 shrink-0 select-none",
              theme === 'dark' ? "bg-neutral-900/30 border-neutral-800" : "bg-white/50 border-neutral-200"
            )}>
              <IconClipboard className="w-4.5 h-4.5 text-brand shrink-0" />
              <span><b>Pro-tip:</b> Clipboard paste is enabled. Simply click anywhere on this window and hit <b>Ctrl + V</b> (or <b>Cmd + V</b>) to upload a new screenshot directly.</span>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
