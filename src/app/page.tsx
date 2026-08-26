import React from 'react';
import Link from 'next/link';
import {
  IconDeviceLaptop,
  IconPhoto,
  IconSparkles,
  IconLayout,
  IconArrowRight,
  IconScreenShare,
  IconBrandX,
  IconDevices,
  IconBrandGithub
} from '@tabler/icons-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://snapshot.dev';

export const metadata = {
  title: "Snapshot - Turn screenshots into beautiful, share-ready visuals",
  description: "Create gorgeous screenshot mockups for your SaaS, apps, code, dashboards, or design presentations. Customizable frames, padding, shadow, and gradients.",
  keywords: ["screenshot", "mockup", "screenshot editor", "beautifier", "design", "developer tool", "indie hacker", "social media post designer", "browser mockup", "iphone mockup"],
  openGraph: {
    title: "Snapshot - Turn screenshots into beautiful, share-ready visuals",
    description: "Create gorgeous screenshot mockups for your SaaS, apps, code, dashboards, or design presentations.",
    type: "website",
    url: siteUrl,
    images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: "Snapshot - Turn screenshots into beautiful, share-ready visuals" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Snapshot - Beautiful Screenshot Mockups",
    description: "Turn screenshots into beautiful, share-ready visuals in seconds.",
    images: [`${siteUrl}/og-image.png`]
  }
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-neutral-900 flex flex-col font-sans select-none overflow-x-hidden relative">
      {/* Background decorations */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#4f46e5]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#6366f1]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header navbar */}
      <header className="h-20 mt-4 flex items-center justify-between px-6 md:px-12 max-w-7xl w-full mx-auto z-10">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg overflow-hidden bg-brand/80 shadow-sm flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Snapshot Logo" className="w-full h-full object-contain p-1" />
          </div>
          <span className="text-xl font-bold tracking-tight text-neutral-900">Snapshot</span>
        </div>
        <Link
          href="/create"
          className="flex items-center space-x-1.5 px-4.5 py-2 rounded-lg text-xs font-bold bg-brand hover:bg-brand-hover text-white transition-all duration-200 shadow-md hover:scale-105"
        >
          <span>Go to Editor</span>
          <IconArrowRight className="w-3.5 h-3.5" />
        </Link>
      </header>

      {/* Hero section */}
      <section className="flex-1 max-w-5xl w-full mx-auto px-6 pt-16 md:pt-24 text-center z-10 flex flex-col items-center justify-center">
        {/* Floating Tag */}
        <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-brand/10 border border-brand/20 text-brand mb-8">
          <IconSparkles className="w-3.5 h-3.5 text-brand" />
          <span>Create stunning mockups instantly</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 max-w-3xl text-neutral-900">
          Turn screenshots into <span className="bg-gradient-to-r from-brand via-[#6366f1] to-[#818cf8] bg-clip-text text-transparent">beautiful, share-ready</span> visuals.
        </h1>

        <p className="text-sm md:text-lg text-neutral-600 max-w-2xl mb-10 leading-relaxed font-medium">
          Create gorgeous, high-resolution mockup graphics for your SaaS, apps, code, dashboards, or presentations in seconds. Customized frames, dynamic padding, shadows, and mesh gradients.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto justify-center">
          <Link
            href="/create"
            className="flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-brand hover:bg-brand-hover transition-all shadow-lg hover:shadow-brand/20 hover:scale-105 active:scale-95"
          >
            <IconScreenShare className="w-4.5 h-4.5" />
            <span>Start Customizing Free</span>
          </Link>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-12 mb-24 text-left">
          {/* Feature 1 */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 relative group hover:border-brand/40 transition-all duration-300 shadow-sm hover:shadow-md">
            <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center text-brand mb-4 border border-brand/20">
              <IconDeviceLaptop className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold mb-2 text-neutral-900">Beautiful Device Mockups</h3>
            <p className="text-xs text-neutral-500 leading-relaxed font-medium">
              Wrap screenshots inside highly detailed macOS, Windows, browser address bars, iPhone portraits, or iPad landscapes automatically.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 relative group hover:border-brand/40 transition-all duration-300 shadow-sm hover:shadow-md">
            <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center text-brand mb-4 border border-brand/20">
              <IconPhoto className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold mb-2 text-neutral-900">Advanced Background Modes</h3>
            <p className="text-xs text-neutral-500 leading-relaxed font-medium">
              Choose from 18 gorgeous built-in gradients, solid colors, custom linear/radial builders, or contextual blurred glass backplates.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 relative group hover:border-brand/40 transition-all duration-300 shadow-sm hover:shadow-md">
            <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center text-brand mb-4 border border-brand/20">
              <IconLayout className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold mb-2 text-neutral-900">Granular X/Y Controls</h3>
            <p className="text-xs text-neutral-500 leading-relaxed font-medium">
              Adjust vertical and horizontal padding independently (like Xnapper), tweak corner radii, drop shadows, and scale resolution up to 3x.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-neutral-50 py-8 text-center text-xs text-neutral-500 z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            Snapshot &copy; 2026. Made with ❤️ and developed by{' '}
            <a
              href="https://dhirajarya.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand underline font-semibold transition-colors"
            >
              dhirajaryaa
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/create" className="hover:text-neutral-700 transition-colors">Editor</Link>
            <a
              href="https://github.com/dhirajaryaa"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-700 transition-colors flex items-center space-x-1"
            >
              <IconBrandGithub className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://x.com/dhirajaryaa"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-700 transition-colors flex items-center space-x-1"
            >
              <IconBrandX className="w-3.5 h-3.5" />
              <span>Twitter</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
