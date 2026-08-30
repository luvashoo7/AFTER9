import apiClient from './apiClient';
import { ENDPOINTS } from '../config/api.config';

export const authService = {
  async signup(signupData) {
    const res = await apiClient.post(ENDPOINTS.AUTH.SIGNUP, signupData);
    return res.data;
  },

  async requestOtp(phone) {
    const res = await apiClient.post(ENDPOINTS.AUTH.REQUEST_OTP, { phone });
    return res.data;
  },

  async verifyOtp(phone, otp, profileData = {}) {
    const res = await apiClient.post(ENDPOINTS.AUTH.VERIFY_OTP, { phone, otp, ...profileData });
    if (res.data?.accessToken) {
      apiClient.setTokens(res.data.accessToken, res.data.refreshToken);
    }
    return res.data;
  },

  async getProfile() {
    const res = await apiClient.get(ENDPOINTS.USERS.ME);
    return res.data;
  },

  async updateProfile(profileData) {
    const res = await apiClient.patch(ENDPOINTS.USERS.ME, profileData);
    return res.data;
  },

  async logout() {
    const refreshToken = localStorage.getItem('after9_refresh_token');
    try {
      if (refreshToken) {
        await apiClient.post(ENDPOINTS.AUTH.LOGOUT, { refreshToken });
      }
    } catch {}
    apiClient.clearTokens();
  },
};

export default authService;
