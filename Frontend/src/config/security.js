// Security configuration for the frontend application

export const SECURITY_CONFIG = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api',
  
  // Environment
  NODE_ENV: import.meta.env.VITE_NODE_ENV || 'development',
  
  // App Information
  APP_NAME: import.meta.env.VITE_APP_NAME || 'ITBU University',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  
  // Security Settings
  TOKEN_STORAGE_KEY: 'authToken',
  MAX_LOGIN_ATTEMPTS: 5,
  SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  
  // Input Validation
  MAX_INPUT_LENGTH: 1000,
  ALLOWED_FILE_TYPES: ['application/pdf'],
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  
  // Rate Limiting (client-side)
  API_RETRY_ATTEMPTS: 3,
  API_RETRY_DELAY: 1000, // 1 second
};

// Input sanitization function
export const sanitizeInput = (input) => {
  if (typeof input === 'string') {
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .substring(0, SECURITY_CONFIG.MAX_INPUT_LENGTH); // Limit length
  }
  return input;
};

// Validate file upload
export const validateFile = (file) => {
  if (!file) return { valid: false, error: 'No file selected' };
  
  if (!SECURITY_CONFIG.ALLOWED_FILE_TYPES.includes(file.type)) {
    return { valid: false, error: 'Only PDF files are allowed' };
  }
  
  if (file.size > SECURITY_CONFIG.MAX_FILE_SIZE) {
    return { valid: false, error: 'File size must be less than 5MB' };
  }
  
  return { valid: true };
};

// Secure token storage
export const secureStorage = {
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('Failed to store item:', error);
    }
  },
  
  getItem: (key) => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('Failed to retrieve item:', error);
      return null;
    }
  },
  
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  }
};

// Rate limiting helper
export const rateLimiter = {
  attempts: new Map(),
  
  canAttempt(key, maxAttempts = SECURITY_CONFIG.MAX_LOGIN_ATTEMPTS) {
    const now = Date.now();
    const attempts = this.attempts.get(key) || [];
    
    // Remove attempts older than 15 minutes
    const recentAttempts = attempts.filter(time => now - time < 15 * 60 * 1000);
    
    if (recentAttempts.length >= maxAttempts) {
      return false;
    }
    
    recentAttempts.push(now);
    this.attempts.set(key, recentAttempts);
    return true;
  },
  
  resetAttempts(key) {
    this.attempts.delete(key);
  }
};
