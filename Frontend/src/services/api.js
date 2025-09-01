import { SECURITY_CONFIG, sanitizeInput, secureStorage } from '../config/security.js';

// API Configuration
const rawBase = SECURITY_CONFIG.API_BASE_URL;
const API_BASE_URL = rawBase.replace(/\/?$/, '') // remove trailing slash
  .replace(/(?<!:)\/\/+/, '/') // collapse accidental double slashes
  ;

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  return secureStorage.getItem(SECURITY_CONFIG.TOKEN_STORAGE_KEY);
};

// Helper function to set auth token in localStorage
const setAuthToken = (token) => {
  secureStorage.setItem(SECURITY_CONFIG.TOKEN_STORAGE_KEY, token);
};

// Helper function to remove auth token from localStorage
const removeAuthToken = () => {
  secureStorage.removeItem(SECURITY_CONFIG.TOKEN_STORAGE_KEY);
};

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`.replace(/(?<!:)\/\/+/, '/');
  const token = getAuthToken();

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Invalid response format');
    }
    
    const data = await response.json();

    if (!response.ok) {
      // Handle specific error cases
      if (response.status === 401) {
        // Token expired or invalid
        removeAuthToken();
        window.location.href = '/admin';
        throw new Error('Session expired. Please login again.');
      }
      
      if (response.status === 429) {
        throw new Error('Too many requests. Please try again later.');
      }
      
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    // Only log errors in development
    if (SECURITY_CONFIG.NODE_ENV === 'development') {
      console.error('API Error:', error);
    }
    throw error;
  }
};

// Auth API functions
export const authAPI = {
  // Login admin
  login: async (username, password) => {
    // Sanitize inputs
    const sanitizedUsername = sanitizeInput(username);
    const sanitizedPassword = sanitizeInput(password);
    
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ 
        username: sanitizedUsername, 
        password: sanitizedPassword 
      }),
    });

    if (response.success && response.data.token) {
      setAuthToken(response.data.token);
    }

    return response;
  },

  // Logout admin
  logout: async () => {
    try {
      await apiRequest('/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      removeAuthToken();
    }
  },

  // Get current admin profile
  getProfile: async () => {
    return await apiRequest('/auth/me');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!getAuthToken();
  },
};

// Results API functions
export const resultsAPI = {
  // Search result by roll number
  searchResult: async (rollNumber) => {
    const sanitizedRollNumber = sanitizeInput(rollNumber);
    return await apiRequest(`/results/search?rollNumber=${encodeURIComponent(sanitizedRollNumber)}`);
  },

  // Get available categories
  getCategories: async () => {
    return await apiRequest('/results/categories');
  },

  // Get public statistics
  getPublicStats: async () => {
    return await apiRequest('/results/stats/public');
  },

  // Get recent results
  getRecentResults: async (limit = 10) => {
    return await apiRequest(`/results/recent?limit=${limit}`);
  },

  // Verify if roll number exists
  verifyRollNumber: async (rollNumber) => {
    const sanitizedRollNumber = sanitizeInput(rollNumber);
    return await apiRequest('/results/verify-roll', {
      method: 'POST',
      body: JSON.stringify({ rollNumber: sanitizedRollNumber }),
    });
  },
};

// Certificates API functions
export const certificatesAPI = {
  // Upload certificate
  uploadCertificate: async (formData) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/certificates/upload`.replace(/(?<!:)\/\/+/, '/'), {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Upload failed');
    }

    return data;
  },

  // Get all certificates
  getCertificates: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/certificates?${queryString}` : '/certificates';
    return await apiRequest(endpoint);
  },

  // Get single certificate
  getCertificate: async (id) => {
    return await apiRequest(`/certificates/${id}`);
  },

  // Update certificate
  updateCertificate: async (id, updates) => {
    return await apiRequest(`/certificates/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  // Delete certificate
  deleteCertificate: async (id) => {
    return await apiRequest(`/certificates/${id}`, {
      method: 'DELETE',
    });
  },

  // Verify certificate
  verifyCertificate: async (id) => {
    return await apiRequest(`/certificates/${id}/verify`, {
      method: 'POST',
    });
  },

  // Get certificate statistics
  getStats: async () => {
    return await apiRequest('/certificates/stats/overview');
  },
};

// Health check
export const healthCheck = async () => {
  try {
    const base = API_BASE_URL.replace(/\/api$/, '');
    const response = await fetch(`${base}/health`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};

export default {
  authAPI,
  resultsAPI,
  certificatesAPI,
  healthCheck,
};
