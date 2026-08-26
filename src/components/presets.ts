export interface EditorSettings {
  backgroundType: 'solid' | 'gradient' | 'blur';
  backgroundColor: string;
  backgroundGradient: string;
  gradientAngle: number;
  backgroundGradientMode: 'preset' | 'custom';
  customGradientColor1: string;
  customGradientColor2: string;
  customGradientType: 'linear' | 'radial';
  customGradientAngle: number;
  blurRadius: number;
  blurBrightness: number;
  cropTop: number;
  cropBottom: number;
  cropLeft: number;
  cropRight: number;
  screenshotScale: number;
  paddingX: number;
  paddingY: number;
  roundness: number;
  shadow: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  frameStyle: 'none' | 'macos-light' | 'macos-dark' | 'windows-light' | 'windows-dark' | 'browser-light' | 'browser-dark' | 'phone-portrait' | 'tablet-portrait' | 'phone-landscape' | 'tablet-landscape';
  browserUrl: string;
  windowTitle: string;
  aspectRatio: 'auto' | '1:1' | '16:9' | '4:3' | '9:16';
  exportFormat: 'png' | 'jpeg';
  exportScale: 1 | 2 | 3;
}

export interface Preset {
  id: string;
  name: string;
  icon: string;
  settings: Partial<EditorSettings>;
}

export const BACKGROUND_PRESETS = {
  gradients: [
    { name: 'Brand Indigo', value: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #818cf8 100%)' },
    { name: 'Sunset Glow', value: 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)' },
    { name: 'Ocean Breeze', value: 'linear-gradient(135deg, #2b5876 0%, #4e4376 100%)' },
    { name: 'Hyper Space', value: 'linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #4f46e5 100%)' },
    { name: 'Cyberpunk', value: 'linear-gradient(135deg, #f857a6 0%, #ff5858 100%)' },
    { name: 'Emerald Silk', value: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
    { name: 'Cotton Candy', value: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' },
    { name: 'Aurora', value: 'linear-gradient(135deg, #7028e4 0%, #e20d71 100%)' },
    { name: 'Neon Dream', value: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)' },
    // 9 New gradients added
    { name: 'Spring Warmth', value: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)' },
    { name: 'Deep Purple', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { name: 'Midnight Sky', value: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)' },
    { name: 'Plum Plate', value: 'linear-gradient(135deg, #48c6ef 0%, #6f86d6 100%)' },
    { name: 'Forest Juice', value: 'linear-gradient(135deg, #155799 0%, #159957 100%)' },
    { name: 'Royal Navy', value: 'linear-gradient(135deg, #141e30 0%, #243b55 100%)' },
    { name: 'Cyber Neon', value: 'linear-gradient(135deg, #ec008c 0%, #fc6767 100%)' },
    { name: 'Soft Lavender', value: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
    { name: 'Warm Flame', value: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' }
  ],
  solids: [
    { name: 'Snapshot Brand', value: '#4f46e5' },
    { name: 'Slate Dark', value: '#0f172a' },
    { name: 'Slate Light', value: '#f8fafc' },
    { name: 'Pure White', value: '#ffffff' },
    { name: 'Pure Black', value: '#000000' },
    { name: 'Crimson Red', value: '#ef4444' },
    { name: 'Forest Green', value: '#22c55e' }
  ]
};

export const SOCIAL_PRESETS: Preset[] = [
  {
    id: 'twitter-x',
    name: 'Twitter / X Post (16:9)',
    icon: 'Twitter',
    settings: {
      aspectRatio: '16:9',
      backgroundType: 'gradient',
      backgroundGradientMode: 'preset',
      backgroundGradient: BACKGROUND_PRESETS.gradients[0].value, // Brand Indigo
      paddingX: 80,
      paddingY: 48,
      roundness: 12,
      shadow: 'xl',
      frameStyle: 'macos-dark',
      browserUrl: 'mysite.com'
    }
  },
  {
    id: 'instagram-post',
    name: 'Instagram Post (1:1)',
    icon: 'Instagram',
    settings: {
      aspectRatio: '1:1',
      backgroundType: 'gradient',
      backgroundGradientMode: 'preset',
      backgroundGradient: BACKGROUND_PRESETS.gradients[1].value, // Sunset Glow
      paddingX: 96,
      paddingY: 96,
      roundness: 16,
      shadow: '2xl',
      frameStyle: 'browser-light',
      browserUrl: 'mysite.com'
    }
  },
  {
    id: 'linkedin-post',
    name: 'LinkedIn Post (16:9)',
    icon: 'Linkedin',
    settings: {
      aspectRatio: '16:9',
      backgroundType: 'gradient',
      backgroundGradientMode: 'preset',
      backgroundGradient: BACKGROUND_PRESETS.gradients[2].value, // Ocean Breeze
      paddingX: 64,
      paddingY: 36,
      roundness: 8,
      shadow: 'lg',
      frameStyle: 'browser-dark',
      browserUrl: 'mysite.com'
    }
  },
  {
    id: 'product-hunt',
    name: 'Product Hunt (4:3)',
    icon: 'Layers',
    settings: {
      aspectRatio: '4:3',
      backgroundType: 'solid',
      backgroundColor: '#ffffff',
      paddingX: 48,
      paddingY: 48,
      roundness: 8,
      shadow: 'lg',
      frameStyle: 'macos-light',
      browserUrl: 'producthunt.com'
    }
  },
  {
    id: 'dribbble-shot',
    name: 'Dribbble Shot (4:3)',
    icon: 'Dribbble',
    settings: {
      aspectRatio: '4:3',
      backgroundType: 'gradient',
      backgroundGradientMode: 'preset',
      backgroundGradient: BACKGROUND_PRESETS.gradients[7].value, // Aurora
      paddingX: 80,
      paddingY: 60,
      roundness: 16,
      shadow: '2xl',
      frameStyle: 'macos-dark',
      browserUrl: 'dribbble.com'
    }
  }
];

export const DEFAULT_SETTINGS: EditorSettings = {
  backgroundType: 'gradient',
  backgroundColor: '#4f46e5',
  backgroundGradient: BACKGROUND_PRESETS.gradients[0].value,
  gradientAngle: 135,
  backgroundGradientMode: 'preset',
  customGradientColor1: '#3b82f6',
  customGradientColor2: '#8b5cf6',
  customGradientType: 'linear',
  customGradientAngle: 135,
  blurRadius: 32,
  blurBrightness: 75,
  cropTop: 0,
  cropBottom: 0,
  cropLeft: 0,
  cropRight: 0,
  screenshotScale: 100,
  paddingX: 64,
  paddingY: 48,
  roundness: 12,
  shadow: 'xl',
  frameStyle: 'macos-dark',
  browserUrl: 'snapshot.dev',
  windowTitle: 'Untitled Window',
  aspectRatio: 'auto',
  exportFormat: 'png',
  exportScale: 2
};
