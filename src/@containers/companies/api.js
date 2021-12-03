import {api, Auth} from "@services";

export const agencyLockCompany = form =>  api.patch(`/v1/agency/companies/${form.id}/lock-status`, form);
export const fetchAgencyCompanies = params =>  api.get(`/v1/${Auth.role}/companies`, {
  params,
});

export const fetchAgencyCompanyLeadStats = params =>  api.get(`/v1/${Auth.role}/companies/${params.companyId}/lead-stats`, {
  params,
});

export const fetchTimezones = params =>  api.get(`/v1/timezones`, {
  params,
});
export const fetchAgencyCompany = id => api.get(`/v1/agency/companies/${id}`);
export const fetchAgencyCompanyGraph = (companyId, params) => api.get(`/v1/agency/companies/${companyId}/graph/${params.graphType}`, {
  params,
});
export const fetchCompanyGraph = params => api.get(`/v1/company/graph/${params.graphType}`, { params });
