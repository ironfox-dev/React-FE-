import { api } from "@services";

export const fetchAgencyCompanyDeals = params => {
  return api.get(`/v1/agency/deals`, { params });
};

export const fetchCompanyDeals = params => {
  return api.get(`/v1/company/deals`, { params });
};

export const deleteAgencyCompanyDeal = (companyId, id) => {
  return api.delete(`/v1/agency/companies/${companyId}/deals/${id}`);
};

export const deleteCompanyDeal = id => {
  return api.delete(`/v1/company/deals/${id}`);
};

export const fetchDealsStatistics = (dealIds, fromDate, toDate) => {
  const query = '&dealIds[]=' + dealIds.join('&dealIds[]=')
  return api.get(`/v1/agency/deals/leads/statistics?fromDate=${fromDate}&toDate=${toDate}${query}`);
}
