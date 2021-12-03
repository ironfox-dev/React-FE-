import { api, Auth } from "@services";

export const fetchAgencyCompanies = params =>  api.get(`/v1/${Auth.role}/companies`, {
  params,
});

export const companyAgentLeadGraph = (agentId, filters) => api.get(`/v1/${Auth.role}/agents/${agentId}/graph/${filters.graphType}`, {
  params: {
    ...filters
  }
});


export const agentLeadGraph = filters => api.get(`/v1/agent/leads/graph/${filters.graphType}`, {
  params: {
    ...filters
  }
});

