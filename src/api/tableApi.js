import api from "./axios";

export const getAllTables = () => api.get("/tables");
export const getTable = (id) => api.get(`/tables/${id}`);
export const createTable = (data) => api.post("/tables", data);
export const updateTableStatus = (id, data) => api.put(`/tables/${id}`, data);
export const deleteTable = (id) => api.delete(`/tables/${id}`);