import api from "./axios";

export const getAllMenuItems = () => api.get("/menus");
export const getMenuItem = (id) => api.get(`/menus/${id}`);
export const createMenuItem = (data) => api.post("/menus", data);
export const updateMenuItem = (id, data) => api.put(`/menus/${id}`, data);
export const deleteMenuItem = (id) => api.delete(`/menus/${id}`);