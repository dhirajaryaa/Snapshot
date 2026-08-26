'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import {
  DEFAULT_SETTINGS,
  EditorSettings,
  Preset
} from './presets';

// Import split layout components
import { EditorHeader } from './editor/editor-header';
import { SidebarArea } from './editor/sidebar-area';
import { CanvasArea } from './editor/canvas-area';

import { toPng, toJpeg } from 'html-to-image';

// Default mockup screen data URL
const SAMPLE_IMAGE = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="480" viewBox="0 0 800 480"><rect width="800" height="480" fill="%230c1020"/><rect x="40" y="40" width="720" height="400" rx="8" fill="%23131930" stroke="%231d274f" stroke-width="1"/><circle cx="70" cy="65" r="6" fill="%23ef4444"/><circle cx="90" cy="65" r="6" fill="%23f59e0b"/><circle cx="110" cy="65" r="6" fill="%2310b981"/><text x="50" y="110" fill="%234f46e5" font-family="monospace" font-size="13" font-weight="bold">// Welcome to Snapshot!</text><text x="50" y="140" fill="%236366f1" font-family="monospace" font-size="13" font-weight="bold">const</text><text x="95" y="140" fill="%23e2e8f0" font-family="monospace" font-size="13">snapshot</text><text x="165" y="140" fill="%236366f1" font-family="monospace" font-size="13">=</text><text x="180" y="140" fill="%2338bdf8" font-family="monospace" font-size="13">beautify</text><text x="245" y="140" fill="%23e2e8f0" font-family="monospace" font-size="13">(screenshot) =&gt; {</text><text x="80" y="170" fill="%236366f1" font-family="monospace" font-size="13">return</text><text x="135" y="170" fill="%23e2e8f0" font-family="monospace" font-size="13">{ ...screenshot, style: </text><text x="310" y="170" fill="%2310b981" font-family="monospace" font-size="13">'amazing'</text><text x="385" y="170" fill="%23e2e8f0" font-family="monospace" font-size="13"> };</text><text x="50" y="200" fill="%23e2e8f0" font-family="monospace" font-size="13">};</text><text x="50" y="240" fill="%236366f1" font-family="monospace" font-size="13">export default</text><text x="165" y="240" fill="%2338bdf8" font-family="monospace" font-size="13">beautify</text><text x="230" y="240" fill="%23e2e8f0" font-family="monospace" font-size="13">;</text><rect x="50" y="280" width="700" height="130" rx="6" fill="%23090d16" stroke="%23171e36" stroke-width="1"/><text x="70" y="315" fill="%2364748b" font-family="monospace" font-size="12">$ bun run dev</text><text x="70" y="345" fill="%2310b981" font-family="monospace" font-size="12">✓ Snapshot is running on http://localhost:3000</text><text x="70" y="375" fill="%2338bdf8" font-family="monospace" font-size="12">ℹ Drag &amp; drop your screenshot or paste directly here to begin!</text></svg>`;

export function SnapshotEditor() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [settings, setSettings] = useState<EditorSettings>(DEFAULT_SETTINGS);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeSection, setActiveSection] = useState<string>('presets');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [customSolid, setCustomSolid] = useState<string>('#4F46E5');
  const [dragOver, setDragOver] = useState<boolean>(false);

  // Mobile sidebar drawer open/close
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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

  // Check query params to preload sample image
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('sample') === 'true') {
        setImageUrl(SAMPLE_IMAGE);
      }
    }
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
    setCustomSolid('#4F46E5');
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
      if (settings.backgroundGradientMode === 'custom') {
        const c1 = settings.customGradientColor1;
        const c2 = settings.customGradientColor2;
        if (settings.customGradientType === 'linear') {
          return { background: `linear-gradient(${settings.customGradientAngle}deg, ${c1} 0%, ${c2} 100%)` };
        } else {
          return { background: `radial-gradient(circle, ${c1} 0%, ${c2} 100%)` };
        }
      }

      let gradientStr = settings.backgroundGradient;
      if (gradientStr.startsWith('linear-gradient')) {
        gradientStr = gradientStr.replace(/\d+deg/, `${settings.gradientAngle}deg`);
      }
      return { background: gradientStr };
    }
    return { backgroundColor: '#18181b' };
  };

  return (
    <div className="min-h-screen w-full flex flex-col font-sans transition-colors duration-300 bg-background text-foreground relative">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-center space-x-2.5 px-4 py-3 rounded-lg shadow-xl border animate-in slide-in-from-top-4 duration-300 bg-card border-brand text-card-foreground">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}

      {/* Header bar */}
      <EditorHeader
        imageUrl={imageUrl}
        theme={theme}
        onThemeToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        onReset={handleReset}
        onUploadClick={triggerFileInput}
        onDownload={handleDownload}
        onCopyToClipboard={handleCopyToClipboard}
        isExporting={isExporting}
        mobileSidebarOpen={mobileSidebarOpen}
        onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
      />

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* Left Side Settings Sidebar (Drawer on mobile, Pinned on desktop) */}
        <SidebarArea
          settings={settings}
          theme={theme}
          activeSection={activeSection}
          onToggleSection={handleToggleSection}
          applyPreset={applyPreset}
          updateSetting={updateSetting}
          customSolid={customSolid}
          setCustomSolid={setCustomSolid}
          mobileSidebarOpen={mobileSidebarOpen}
          onReset={handleReset}
          onUploadClick={triggerFileInput}
        />

        {/* Drawer Backdrop Overlay (Mobile only, bounds adjusted under the header) */}
        {mobileSidebarOpen && (
          <div
            className="fixed top-16 bottom-0 left-0 right-0 bg-black/40 backdrop-blur-[1px] z-30 md:hidden animate-in fade-in duration-200"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* Right Side: Preview Work area */}
        <CanvasArea
          imageUrl={imageUrl}
          settings={settings}
          previewRef={previewRef}
          fileInputRef={fileInputRef}
          onImageUpload={handleImageUpload}
          onUseSample={handleUseSample}
          dragOver={dragOver}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          getBackgroundStyles={getBackgroundStyles}
        />
      </main>
    </div>
  );
}
