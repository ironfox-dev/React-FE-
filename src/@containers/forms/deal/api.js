import {api} from "../../../@services";

export const createAgencyCompanyDeal = form => {
  return api.post(`/v1/agency/companies/${form.companyId}/deals`, form);
};

export const createCompanyDeal = form => {
  return api.post(`/v1/company/deals`, form);
};

export const updateAgencyCompanyDeal = form => {
  return api.patch(`/v1/agency/companies/${form.companyId}/deals/${form.id}`, form);
};

export const updateCompanyDeal = form => {
  return api.patch(`/v1/company/deals/${form.id}`, form);
};

