import { api } from "@services";

export const createUser = form => api.post(`/v1/admin/users`, form);
export const updateUser = form => api.patch(`/v1/admin/users/${form.id}`, form);
