import {api, Auth} from "@services";

export const updateAgencyCompanyLead = form => {
  return api.patch(`/v1/${Auth.role}/companies/${form.company_id}/leads/${form.id}`, form);
};

export const updateCompanyLead = form => {
  return api.patch(`/v1/${Auth.role}/leads/${form.id}`, form);
};

export const createAgencyCompanyLead = form => {
  return api.post(`/v1/${Auth.role}/companies/${form.company_id}/leads`, form);
};

export const createCompanyLead = form => {
  return api.post(`/v1/${Auth.role}/leads`, form);
};
