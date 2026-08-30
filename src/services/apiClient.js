import { API_BASE_URL } from '../config/api.config';

class ApiClient {
  constructor(baseUrl = API_BASE_URL) {
    this.baseUrl = baseUrl;
    this.refreshPromise = null;
  }

  getAccessToken() {
    try {
      return localStorage.getItem('after9_access_token') || null;
    } catch {
      return null;
    }
  }

  getRefreshToken() {
    try {
      return localStorage.getItem('after9_refresh_token') || null;
    } catch {
      return null;
    }
  }

  setTokens(accessToken, refreshToken) {
    try {
      if (accessToken) localStorage.setItem('after9_access_token', accessToken);
      if (refreshToken) localStorage.setItem('after9_refresh_token', refreshToken);
    } catch {}
  }

  clearTokens() {
    try {
      localStorage.removeItem('after9_access_token');
      localStorage.removeItem('after9_refresh_token');
    } catch {}
  }

  async refreshToken() {
    if (this.refreshPromise) return this.refreshPromise;

    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      this.clearTokens();
      throw new Error('No refresh token available');
    }

    this.refreshPromise = (async () => {
      try {
        const response = await fetch(`${this.baseUrl}/auth/refresh-token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok || !data.success) {
          this.clearTokens();
          throw new Error(data?.error?.message || 'Token refresh failed');
        }
        const newTokens = data.data;
        this.setTokens(newTokens.accessToken, newTokens.refreshToken);
        return newTokens.accessToken;
      } catch (err) {
        this.clearTokens();
        throw err;
      } finally {
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  async request(endpoint, options = {}, isRetry = false) {
    const url = endpoint.startsWith('http') ? endpoint : `${this.baseUrl}${endpoint}`;

    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const token = this.getAccessToken();
    if (token && !headers.Authorization) {
      headers.Authorization = `Bearer ${token}`;
    }

    if (options.idempotencyKey) {
      headers['Idempotency-Key'] = options.idempotencyKey;
    }

    const config = {
      ...options,
      headers,
    };

    if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
      config.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json().catch(() => ({}));

      // Automatic silent token refresh on 401 TOKEN_EXPIRED
      if (response.status === 401 && !isRetry && this.getRefreshToken()) {
        try {
          const newAccessToken = await this.refreshToken();
          if (newAccessToken) {
            const retryHeaders = {
              ...headers,
              Authorization: `Bearer ${newAccessToken}`,
            };
            return await this.request(endpoint, { ...options, headers: retryHeaders }, true);
          }
        } catch (refreshErr) {
          console.warn('[AFTER 9 API] Silent token refresh failed:', refreshErr?.message);
        }
      }

      if (!response.ok || data.success === false) {
        const errorMsg = data?.error?.message || `HTTP ${response.status}: Request failed`;
        const error = new Error(errorMsg);
        error.status = response.status;
        error.code = data?.error?.code || 'REQUEST_FAILED';
        error.details = data?.error?.details || null;
        throw error;
      }

      return data;
    } catch (err) {
      // If network error (e.g. backend not running yet), provide clear diagnostics
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        console.warn(`[AFTER 9 API] Could not reach backend at ${url}. Check if backend is running on the configured host & port.`);
      }
      throw err;
    }
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  post(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: 'POST', body });
  }

  patch(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: 'PATCH', body });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
export default apiClient;
