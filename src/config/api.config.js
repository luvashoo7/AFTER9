/**
 * ===================================================================
 * 🌙 AFTER 9 - SINGLE SOURCE OF TRUTH FOR BACKEND HOST & PORT CONFIG
 * ===================================================================
 * Change host, port, or protocol HERE (or via .env) and the entire
 * frontend app, API calls, and WebSockets will automatically update!
 * ===================================================================
 */

export const BACKEND_CONFIG = {
  // Change default host here if needed (e.g. '192.168.1.10' for mobile testing or 'api.after9.delivery')
  HOST: import.meta.env.VITE_API_HOST || 'localhost',

  // Change default port here if backend runs on a different port
  PORT: import.meta.env.VITE_API_PORT || '5000',

  // Protocol ('http' / 'https')
  PROTOCOL: import.meta.env.VITE_API_PROTOCOL || 'http',

  // WebSocket Protocol ('ws' / 'wss')
  WS_PROTOCOL: import.meta.env.VITE_WS_PROTOCOL || 'ws',

  // API Version Prefix
  API_PREFIX: '/api/v1',
};

// Derived URLs (automatically computed from above single source of truth)
export const BACKEND_BASE_URL = `${BACKEND_CONFIG.PROTOCOL}://${BACKEND_CONFIG.HOST}:${BACKEND_CONFIG.PORT}`;
export const API_BASE_URL = `${BACKEND_BASE_URL}${BACKEND_CONFIG.API_PREFIX}`;
export const SOCKET_URL = BACKEND_BASE_URL;

/**
 * Full Endpoints Map
 */
export const ENDPOINTS = {
  // Health
  HEALTH: `${API_BASE_URL}/health`,

  // Authentication
  AUTH: {
    SIGNUP: `${API_BASE_URL}/auth/signup`,
    REQUEST_OTP: `${API_BASE_URL}/auth/request-otp`,
    VERIFY_OTP: `${API_BASE_URL}/auth/verify-otp`,
    REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh-token`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
  },

  // User Profile
  USERS: {
    ME: `${API_BASE_URL}/users/me`,
  },

  // Addresses
  ADDRESSES: {
    BASE: `${API_BASE_URL}/addresses`,
    BY_ID: (id) => `${API_BASE_URL}/addresses/${id}`,
  },

  // Serviceability & Zones
  SERVICEABILITY: {
    CHECK: `${API_BASE_URL}/serviceability/check`,
    ZONES: `${API_BASE_URL}/service-zones`,
  },

  // Catalog
  CATEGORIES: `${API_BASE_URL}/categories`,
  PRODUCTS: {
    BASE: `${API_BASE_URL}/products`,
    SEARCH: `${API_BASE_URL}/products/search`,
    BY_ID: (id) => `${API_BASE_URL}/products/${id}`,
  },

  // Cart
  CART: {
    BASE: `${API_BASE_URL}/cart`,
    ITEMS: `${API_BASE_URL}/cart/items`,
    ITEM_BY_ID: (itemId) => `${API_BASE_URL}/cart/items/${itemId}`,
    COUPON: `${API_BASE_URL}/cart/coupon`,
  },

  // Orders & Open-Box Inspection
  ORDERS: {
    BASE: `${API_BASE_URL}/orders`,
    BY_ID: (id) => `${API_BASE_URL}/orders/${id}`,
    CANCEL: (id) => `${API_BASE_URL}/orders/${id}/cancel`,
    INSPECTION: (orderId) => `${API_BASE_URL}/orders/${orderId}/inspection`,
    ACCEPT_ITEM: (orderId, itemId) => `${API_BASE_URL}/orders/${orderId}/inspection/items/${itemId}/accept`,
    REJECT_ITEM: (orderId, itemId) => `${API_BASE_URL}/orders/${orderId}/inspection/items/${itemId}/reject`,
    COMPLETE_INSPECTION: (orderId) => `${API_BASE_URL}/orders/${orderId}/inspection/complete`,
  },

  // Payments
  PAYMENTS: {
    CREATE: `${API_BASE_URL}/payments/create`,
    VERIFY: `${API_BASE_URL}/payments/verify`,
    MOCK_SUCCESS: `${API_BASE_URL}/payments/mock-success`,
  },

  // Delivery Partner
  DELIVERY: {
    ORDERS: `${API_BASE_URL}/delivery/orders`,
    ORDER_BY_ID: (orderId) => `${API_BASE_URL}/delivery/orders/${orderId}`,
    ACCEPT: (orderId) => `${API_BASE_URL}/delivery/orders/${orderId}/accept`,
    STATUS: (orderId) => `${API_BASE_URL}/delivery/orders/${orderId}/status`,
    LOCATION: `${API_BASE_URL}/delivery/location`,
  },

  // Returns & Uploads
  RETURNS: {
    BASE: `${API_BASE_URL}/returns`,
    BY_ID: (orderId) => `${API_BASE_URL}/returns/${orderId}`,
  },
  DEVICES: `${API_BASE_URL}/devices`,
  UPLOADS: `${API_BASE_URL}/uploads`,
};
