import api from "./axios";

export const createStaffUser = (data) => api.post("/users/staff", data);
export const getStaffUsers = () => api.get("/users/staff");
export const updateUserRole = (id, data) => api.put(`/users/${id}/role`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);