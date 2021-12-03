import { api } from "@services";

export const createAgencyCompany = form => api.post(`/v1/agency/companies`, form);
export const updateAgencyCompany = form => api.patch(`/v1/agency/companies/${form.id}`, form);
