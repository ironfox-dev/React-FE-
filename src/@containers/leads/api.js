import {api, Auth} from "@services";

export const fetchLeads = params => {
  return api.get(`/v1/${Auth.role}/leads`, {
    params,
  });
};

export const deleteAgencyCompanyLead = (companyId, id) => {
  return api.delete(`/v1/${Auth.role}/companies/${companyId}/leads/${id}`);
};

export const getTwilioTokenBy = (leadId) => {
  return api.get(`/v1/twilio/token/${leadId}`);
};


export const exportTo = (payload) => {
  return api.post(`/v1/reports`, { payload });
};

export const reportPoll = uuid => {
  return api.get(`/v1/reports/${uuid}/poll`);
};

export const deleteCompanyLead = id => {
  return api.delete(`/v1/${Auth.role}/leads/${id}`);
};

