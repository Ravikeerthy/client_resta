import api from "./axios";

export const createOrder = (data) => api.post("/orders", data);
export const getAllOrders = () => api.get("/orders");
export const getOrder = (id) => api.get(`/orders/${id}`);
export const updateOrderStatus = (id, data) => api.put(`/orders/${id}/status`, data);
export const updatePaymentStatus = (id, data) => api.put(`/orders/${id}/payment`, data);
export const deleteOrder = (id) => api.delete(`/orders/${id}`);