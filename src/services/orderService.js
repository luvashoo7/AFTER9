import apiClient from './apiClient';
import { ENDPOINTS } from '../config/api.config';

export const orderService = {
  async createOrder(orderPayload, idempotencyKey = null) {
    const res = await apiClient.post(
      ENDPOINTS.ORDERS.BASE,
      orderPayload,
      { idempotencyKey }
    );
    return res.data;
  },

  async listOrders(params = {}) {
    const query = new URLSearchParams(params).toString();
    const url = query ? `${ENDPOINTS.ORDERS.BASE}?${query}` : ENDPOINTS.ORDERS.BASE;
    const res = await apiClient.get(url);
    return res;
  },

  async getOrderById(orderId) {
    const res = await apiClient.get(ENDPOINTS.ORDERS.BY_ID(orderId));
    return res.data;
  },

  async cancelOrder(orderId, reason) {
    const res = await apiClient.post(ENDPOINTS.ORDERS.CANCEL(orderId), { reason });
    return res.data;
  },
};

export const inspectionService = {
  async getInspection(orderId) {
    const res = await apiClient.get(ENDPOINTS.ORDERS.INSPECTION(orderId));
    return res.data;
  },

  async acceptItem(orderId, itemId) {
    const res = await apiClient.post(ENDPOINTS.ORDERS.ACCEPT_ITEM(orderId, itemId));
    return res.data;
  },

  async rejectItem(orderId, itemId, { reason, notes, evidenceImageUrl }) {
    const res = await apiClient.post(
      ENDPOINTS.ORDERS.REJECT_ITEM(orderId, itemId),
      { reason, notes, evidenceImageUrl }
    );
    return res.data;
  },

  async completeInspection(orderId) {
    const res = await apiClient.post(ENDPOINTS.ORDERS.COMPLETE_INSPECTION(orderId));
    return res.data;
  },
};

export default orderService;
