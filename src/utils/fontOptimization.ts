
// Optimized font loading strategy

interface FontConfig {
  family: string;
  weights: string[];
  display: 'swap' | 'fallback' | 'optional';
  preload?: boolean;
}

class FontOptimizer {
  private loadedFonts = new Set<string>();
  private fontConfigs: FontConfig[] = [
    {
      family: 'Roboto',
      weights: ['400', '500', '700'],
      display: 'swap',
      preload: true
    }
  ];

  async initialize(): Promise<void> {
    // Preload critical fonts
    await this.preloadCriticalFonts();
    
    // Set up font loading observer
    this.setupFontObserver();
  }

  private async preloadCriticalFonts(): Promise<void> {
    const criticalFonts = this.fontConfigs.filter(config => config.preload);
    
    const promises = criticalFonts.flatMap(config =>
      config.weights.map(weight => this.loadFont(config.family, weight))
    );

    await Promise.allSettled(promises);
  }

  private async loadFont(family: string, weight: string): Promise<void> {
    const fontKey = `${family}-${weight}`;
    
    if (this.loadedFonts.has(fontKey)) return;

    if ('fonts' in document) {
      try {
        await document.fonts.load(`${weight} 16px ${family}`);
        this.loadedFonts.add(fontKey);
        console.log(`✅ Font loaded: ${family} ${weight}`);
      } catch (error) {
        console.warn(`❌ Failed to load font: ${family} ${weight}`, error);
      }
    }
  }

  private setupFontObserver(): void {
    if ('fonts' in document) {
      document.fonts.addEventListener('loadingdone', () => {
        console.log('✅ All fonts loaded');
        document.documentElement.classList.add('fonts-loaded');
      });
    }
  }

  // Load font on demand
  async loadFontOnDemand(family: string, weight = '400'): Promise<void> {
    await this.loadFont(family, weight);
  }

  // Check if font is loaded
  isFontLoaded(family: string, weight: string): boolean {
    return this.loadedFonts.has(`${family}-${weight}`);
  }
}

export const fontOptimizer = new FontOptimizer();

// Critical CSS for font loading
export const generateCriticalFontCSS = (): string => {
  return `
    /* Font loading optimization */
    .fonts-loading {
      visibility: hidden;
    }
    
    .fonts-loaded .fonts-loading {
      visibility: visible;
    }
    
    /* Fallback fonts */
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    }
    
    .font-roboto {
      font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
  `;
};
