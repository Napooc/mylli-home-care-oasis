
export const SECURITY_CONFIG = {
  // Rate limiting configuration
  RATE_LIMITS: {
    FORM_SUBMISSION: { requests: 5, window: 60000 }, // 5 requests per minute
    API_CALLS: { requests: 100, window: 60000 }, // 100 requests per minute
    LOGIN_ATTEMPTS: { requests: 3, window: 300000 }, // 3 attempts per 5 minutes
  },
  
  // Content Security Policy
  CSP_POLICIES: {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://www.googletagmanager.com"],
    'style-src': ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    'font-src': ["'self'", "https://fonts.gstatic.com"],
    'img-src': ["'self'", "data:", "https:", "blob:"],
    'connect-src': ["'self'", "https://www.google-analytics.com"],
    'frame-src': ["'self'", "https://www.google.com"],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'upgrade-insecure-requests': []
  },
  
  // Input validation patterns
  VALIDATION_PATTERNS: {
    EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    PHONE: /^(?:\+33|0)[1-9](?:[0-9]{8})$/,
    NAME: /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/,
    MESSAGE: /^[\w\s\-.,!?()'"àâäéèêëïîôöùûüÿç]{1,1000}$/i,
  },
  
  // Security headers
  SECURITY_HEADERS: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  }
};

export const SECURITY_MESSAGES = {
  RATE_LIMIT_EXCEEDED: "Trop de tentatives. Veuillez patienter avant de réessayer.",
  INVALID_INPUT: "Les données saisies ne respectent pas le format requis.",
  SUSPICIOUS_ACTIVITY: "Activité suspecte détectée. Votre session a été sécurisée.",
  CSRF_TOKEN_INVALID: "Token de sécurité invalide. Veuillez recharger la page.",
};
