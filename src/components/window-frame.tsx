import React from 'react';
import {
  IconArrowLeft,
  IconArrowRight,
  IconRefresh,
  IconShieldCheck,
  IconWorld,
  IconWifi,
  IconBatteryFilled
} from '@tabler/icons-react';
import { cn } from '@/lib/utils';

interface WindowFrameProps {
  children: React.ReactNode;
  frameStyle: 'none' | 'macos-light' | 'macos-dark' | 'windows-light' | 'windows-dark' | 'browser-light' | 'browser-dark' | 'phone-portrait' | 'tablet-portrait' | 'phone-landscape' | 'tablet-landscape';
  browserUrl: string;
  roundness: number;
  shadow: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const WindowFrame: React.FC<WindowFrameProps> = ({
  children,
  frameStyle,
  browserUrl,
  roundness,
  shadow
}) => {
  const getShadowClass = () => ({
    'shadow-none': shadow === 'none',
    'shadow-sm': shadow === 'sm',
    'shadow-md': shadow === 'md',
    'shadow-lg': shadow === 'lg',
    'shadow-xl': shadow === 'xl',
    'shadow-2xl': shadow === '2xl',
  });

  if (frameStyle === 'none') {
    return (
      <div
        className={cn("overflow-hidden transition-all duration-200", getShadowClass())}
        style={{ borderRadius: `${roundness}px` }}
      >
        {children}
      </div>
    );
  }

  const isDark = frameStyle.endsWith('dark');
  const isMac = frameStyle.startsWith('macos');
  const isWindows = frameStyle.startsWith('windows');
  const isBrowser = frameStyle.startsWith('browser');
  const isPhone = frameStyle.startsWith('phone');
  const isTablet = frameStyle.startsWith('tablet');
  const isPortrait = frameStyle.endsWith('portrait');
  const isLandscape = frameStyle.endsWith('landscape');

  // Phone & Tablet Mockups
  if (isPhone || isTablet) {
    const isPhoneMockup = isPhone;

    // Dynamic aspect ratios and container sizes for mockups
    const aspectRatioClass = isPhoneMockup
      ? (isPortrait ? "aspect-[9/19.5]" : "aspect-[19.5/9]")
      : (isPortrait ? "aspect-[3/4]" : "aspect-[4/3]");

    const bezelSizeClass = isPhoneMockup ? "p-[8px] sm:p-[12px]" : "p-[14px] sm:p-[20px]";
    const borderRadiusStyle = isPhoneMockup ? `${Math.max(roundness, 24)}px` : `${Math.max(roundness, 16)}px`;

    return (
      <div
        className={cn(
          "relative flex items-center justify-center bg-black overflow-hidden transition-all duration-200 border border-neutral-800",
          bezelSizeClass,
          getShadowClass()
        )}
        style={{ borderRadius: borderRadiusStyle, width: isPortrait && isPhoneMockup ? '320px' : (isPortrait && !isPhoneMockup ? '440px' : '100%') }}
      >
        {/* Inner Screen Viewport */}
        <div
          className={cn("relative w-full overflow-hidden bg-[#121212]", aspectRatioClass)}
          style={{ borderRadius: `${Math.max(roundness - 8, 8)}px` }}
        >
          {/* Dynamic Island (Only for Portrait Phone) */}
          {isPhoneMockup && isPortrait && (
            <div className="absolute top-2 w-[100px] h-[26px] bg-black rounded-full left-1/2 -translate-x-1/2 z-30 flex items-center justify-end px-3">
              <div className="w-2 h-2 rounded-full bg-[#141414] border border-[#2a2a2a]" />
            </div>
          )}

          {/* Status Bar (Only for Portrait mode devices to keep UI clean) */}
          {isPortrait && (
            <div className="absolute top-0 w-full h-8 px-5 flex items-center justify-between z-20 pointer-events-none select-none">
              <div className="text-[11px] font-medium text-white mix-blend-difference">9:41</div>
              <div className="flex items-center space-x-1.5 text-white mix-blend-difference">
                <IconWifi className="w-3.5 h-3.5" />
                <IconBatteryFilled className="w-4 h-4" />
              </div>
            </div>
          )}

          {/* Image Content Container */}
          <div className="w-full h-full [&>img]:w-full [&>img]:h-full [&>img]:object-cover [&>img]:object-top">
            {children}
          </div>
        </div>
      </div>
    );
  }

  // OS & Browser Mockups
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden w-full transition-all duration-200 border",
        isDark
          ? "bg-[#1e1e1e] border-neutral-800 text-neutral-300"
          : "bg-white border-neutral-200 text-neutral-600",
        getShadowClass()
      )}
      style={{ borderRadius: `${roundness}px` }}
    >
      {/* Title Bar / Header */}
      {isMac && (
        <div className={cn(
          "flex items-center h-10 px-4 select-none border-b",
          isDark ? "bg-[#121212] border-neutral-800" : "bg-neutral-50 border-neutral-200"
        )}>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] block" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] block" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] block" />
          </div>
          <div className="flex-1 text-center text-xs font-medium opacity-60 truncate px-8">
            Untitled Window
          </div>
        </div>
      )}

      {isWindows && (
        <div className={cn(
          "flex items-center justify-between h-9 pl-3 pr-1 select-none border-b",
          isDark ? "bg-[#1f1f1f] border-neutral-800" : "bg-neutral-100 border-neutral-200"
        )}>
          <div className="text-xs font-normal opacity-70 truncate">
            Untitled Window
          </div>
          <div className="flex items-center h-full text-xs">
            <div className={cn("flex items-center justify-center w-10 h-full transition-colors", isDark ? "hover:bg-neutral-800" : "hover:bg-neutral-200")}>
              <span className={cn("w-2.5 h-[1px]", isDark ? "bg-white" : "bg-black")} />
            </div>
            <div className={cn("flex items-center justify-center w-10 h-full transition-colors", isDark ? "hover:bg-neutral-800" : "hover:bg-neutral-200")}>
              <span className={cn("w-2.5 h-2.5 border", isDark ? "border-white" : "border-black")} />
            </div>
            <div className="flex items-center justify-center w-11 h-full hover:bg-[#e81123] hover:text-white transition-colors group">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-current opacity-80 group-hover:opacity-100">
                <path d="M1 1L9 9M9 1L1 9" strokeWidth="1" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </div>
      )}

      {isBrowser && (
        <div className={cn(
          "flex flex-col select-none border-b",
          isDark ? "bg-[#18181c] border-neutral-800" : "bg-neutral-100 border-neutral-200"
        )}>
          <div className="flex items-center justify-between h-9 px-4">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] block" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] block" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] block" />
            </div>
            <div className={cn(
              "flex items-center h-7 px-4 ml-6 mr-auto rounded-t-md text-xs truncate max-w-[150px] border-t border-x",
              isDark ? "bg-[#222226] border-neutral-800 text-neutral-200" : "bg-white border-neutral-200 text-neutral-700"
            )}>
              <IconWorld className="w-3 h-3 mr-1.5 opacity-60" />
              <span className="truncate">{browserUrl || 'Untitled page'}</span>
            </div>
          </div>
          <div className={cn(
            "flex items-center space-x-3 h-9 px-3 border-t",
            isDark ? "bg-[#222226] border-neutral-800" : "bg-white border-neutral-200"
          )}>
            <div className="flex items-center space-x-2.5 text-neutral-400">
              <IconArrowLeft className="w-3.5 h-3.5 cursor-not-allowed opacity-40" />
              <IconArrowRight className="w-3.5 h-3.5 cursor-not-allowed opacity-40" />
              <IconRefresh className="w-3.5 h-3.5 cursor-not-allowed opacity-40" />
            </div>
            <div className={cn(
              "flex items-center flex-1 h-6 px-3 rounded-md text-xs border text-left truncate space-x-2",
              isDark ? "bg-[#18181c] border-neutral-800 text-neutral-400" : "bg-neutral-50 border-neutral-200 text-neutral-500"
            )}>
              <IconShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="opacity-40 select-none text-emerald-500 shrink-0">https://</span>
              <span className="truncate select-all">{browserUrl || 'yourwebsite.com'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content (Screenshot) */}
      <div className="w-full h-full relative overflow-hidden flex items-center justify-center bg-transparent">
        {children}
      </div>
    </div>
  );
};
