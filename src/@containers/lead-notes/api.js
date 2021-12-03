import {api, Auth} from "../../@services";

export const fetchAgencyCompanyLead = (companyId, id, resetSmsReplayView = 0) => {
  return api.get(`/v1/agency/companies/${companyId}/leads/${id}?resetIsNew=${resetSmsReplayView}`);
};

export const fetchCompanyLead = (id, resetSmsReplayView = 0) => {
  return api.get(`/v1/${Auth.role}/leads/${id}?resetIsNew=${resetSmsReplayView}`);
};

export const createAgencyCompanyLeadNote = (companyId, leadId, form) => {
  return api.post(`/v1/agency/companies/${companyId}/leads/${leadId}/notes`, form);
};

export const createCompanyLeadNote = (leadId, form) => {
  return api.post(`/v1/company/leads/${leadId}/notes`, form);
};

