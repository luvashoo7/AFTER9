import apiClient from './apiClient';
import { ENDPOINTS } from '../config/api.config';

export const addressService = {
  async listAddresses() {
    const res = await apiClient.get(ENDPOINTS.ADDRESSES.BASE);
    return res.data;
  },

  async createAddress(addressData) {
    const res = await apiClient.post(ENDPOINTS.ADDRESSES.BASE, addressData);
    return res.data;
  },

  async updateAddress(addressId, addressData) {
    const res = await apiClient.patch(ENDPOINTS.ADDRESSES.BY_ID(addressId), addressData);
    return res.data;
  },

  async deleteAddress(addressId) {
    const res = await apiClient.delete(ENDPOINTS.ADDRESSES.BY_ID(addressId));
    return res.data;
  },
};

export default addressService;
