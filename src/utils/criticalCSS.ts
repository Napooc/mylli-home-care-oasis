
// Critical CSS extraction and inlining system
export const criticalStyles = `
/* Ultra-critical above-the-fold styles */
body {
  font-family: 'Roboto', system-ui, -apple-system, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #ffffff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.header-container {
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 64px;
  will-change: transform;
}

.hero-section {
  background: linear-gradient(135deg, #0077C0 0%, #003d66 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding-top: 64px;
}

.loading-skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.fade-in-fast {
  animation: fadeInFast 0.3s ease-out forwards;
  opacity: 0;
}

@keyframes fadeInFast {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.gpu-accelerated {
  transform: translateZ(0);
  backface-visibility: hidden;
  will-change: transform;
}
`;

export const injectCriticalCSS = () => {
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = criticalStyles;
    document.head.insertBefore(style, document.head.firstChild);
  }
};
