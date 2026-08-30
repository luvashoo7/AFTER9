import apiClient from './apiClient';
import { ENDPOINTS } from '../config/api.config';

export const zoneService = {
  async checkServiceability(latitude, longitude) {
    const res = await apiClient.post(ENDPOINTS.SERVICEABILITY.CHECK, { latitude, longitude });
    return res.data;
  },

  async listZones() {
    const res = await apiClient.get(ENDPOINTS.SERVICEABILITY.ZONES);
    return res.data;
  },
};

export default zoneService;
