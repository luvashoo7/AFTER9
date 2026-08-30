import apiClient from './apiClient';
import { ENDPOINTS } from '../config/api.config';

export const cartService = {
  async getCart() {
    const res = await apiClient.get(ENDPOINTS.CART.BASE);
    return res.data;
  },

  async addItem(productVariantId, quantity = 1) {
    const res = await apiClient.post(ENDPOINTS.CART.ITEMS, { productVariantId, quantity });
    return res.data;
  },

  async updateItem(itemId, quantity) {
    const res = await apiClient.patch(ENDPOINTS.CART.ITEM_BY_ID(itemId), { quantity });
    return res.data;
  },

  async removeItem(itemId) {
    const res = await apiClient.delete(ENDPOINTS.CART.ITEM_BY_ID(itemId));
    return res.data;
  },

  async clearCart() {
    const res = await apiClient.delete(ENDPOINTS.CART.BASE);
    return res.data;
  },

  async applyCoupon(couponCode) {
    const res = await apiClient.post(ENDPOINTS.CART.COUPON, { couponCode });
    return res.data;
  },

  async removeCoupon() {
    const res = await apiClient.delete(ENDPOINTS.CART.COUPON);
    return res.data;
  },
};

export default cartService;
