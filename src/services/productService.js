import apiClient from './apiClient';
import { ENDPOINTS } from '../config/api.config';

export const productService = {
  async listCategories() {
    const res = await apiClient.get(ENDPOINTS.CATEGORIES);
    return res.data;
  },

  async listProducts(params = {}) {
    const query = new URLSearchParams(params).toString();
    const url = query ? `${ENDPOINTS.PRODUCTS.BASE}?${query}` : ENDPOINTS.PRODUCTS.BASE;
    const res = await apiClient.get(url);
    return res;
  },

  async searchProducts(q, serviceZoneId = null) {
    const params = new URLSearchParams({ q });
    if (serviceZoneId) params.append('serviceZoneId', serviceZoneId);
    const res = await apiClient.get(`${ENDPOINTS.PRODUCTS.SEARCH}?${params.toString()}`);
    return res.data;
  },

  async getProductById(id) {
    const res = await apiClient.get(ENDPOINTS.PRODUCTS.BY_ID(id));
    return res.data;
  },
};

export default productService;
