// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://itbu-university.onrender.com/';

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Helper function to set auth token in localStorage
const setAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

// Helper function to remove auth token from localStorage
const removeAuthToken = () => {
  localStorage.removeItem('authToken');
};

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getAuthToken();

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API functions
export const authAPI = {
  // Login admin
  login: async (username, password) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
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
    return await apiRequest(`/results/search?rollNumber=${encodeURIComponent(rollNumber)}`);
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
    return await apiRequest('/results/verify-roll', {
      method: 'POST',
      body: JSON.stringify({ rollNumber }),
    });
  },
};

// Certificates API functions
export const certificatesAPI = {
  // Upload certificate
  uploadCertificate: async (formData) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/certificates/upload`, {
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
