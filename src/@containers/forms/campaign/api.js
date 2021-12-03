import { api } from "@services";

export const createAgencyCompanyCampaign = form => {
  return api.post(`/v1/agency/companies/${form.companyId}/deals/${form.dealId}/campaigns`, form)
};

export const createCompanyCampaign = form => {
  return api.post(`/v1/company/deals/${form.dealId}/campaigns`, form)
};

export const updateAgencyCompanyCampaign = form => {
  return api.patch(
    `/v1/agency/companies/${form.companyId}/deals/${form.dealId}/campaigns/${form.id}`,
    form
  );
};

export const updateCompanyCampaign = form => {
  return api.patch(
    `/v1/company/deals/${form.dealId}/campaigns/${form.id}`,
    form
  );
};
