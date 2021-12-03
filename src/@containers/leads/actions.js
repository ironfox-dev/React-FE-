export const LOAD_LEADS = 'LOAD_LEADS';
export const ADD_LEAD = 'ADD_LEAD';
export const UPDATE_LEAD = 'UPDATE_LEAD';
export const REMOVE_LEAD = 'REMOVE_LEAD';
export const FILTER_LEADS = 'FILTER_LEADS';
export const SEARCH_LEADS = 'SEARCH_LEADS';
export const GOTO_PAGE_LEADS = 'GOTO_PAGE_LEADS';
export const SHOW_DELETE_LEADS = 'SHOW_DELETE_LEADS';
export const SORT_LEADS = 'SORT_LEADS';
export const OPEN_LEAD_MODAL = 'OPEN_LEAD_MODAL';
export const AGENT_LOAD_LEADS = 'AGENT_LOAD_LEADS';
export const AGENT_LOAD_LEADS_BY_STATUSES = 'AGENT_LOAD_LEADS_BY_STATUSES';
export const AGENT_RESET_LEADS = 'AGENT_RESET_LEADS';
export const AGENT_SEARCH_LEADS = 'AGENT_SEARCH_LEADS';
export const AGENT_NEW_LEADS_COUNT = 'AGENT_NEW_LEADS_COUNT';
export const PUT_TWILIO_TOKEN = 'PUT_TWILIO_TOKEN';

export const loadLeads = (leads, pagination) => ({
  type: LOAD_LEADS,
  leads,
  pagination,
});

export const putTwilioToke = (token) => ({
  type: PUT_TWILIO_TOKEN,
  token,
});

export const addLead = (companyId, campaignId, lead) => ({
  type: ADD_LEAD,
  companyId,
  campaignId,
  lead,
});

export const updateLead = (id, lead) => ({
  type: UPDATE_LEAD,
  id,
  lead,
});

export const removeLead = id => ({
  type: REMOVE_LEAD,
  id,
});

export const filterLeads = filters => ({
  type: FILTER_LEADS,
  filters,
});

export const searchLeads = search => ({
  type: SEARCH_LEADS,
  search,
});

export const gotoPage = activePage => ({
  type: GOTO_PAGE_LEADS,
  activePage,
});

export const toggleShowDeleted = () => ({
  type: SHOW_DELETE_LEADS,
});

export const sortLeads = field => ({
  type: SORT_LEADS,
  field,
});

export const openLeadModal = status => ({
  type: OPEN_LEAD_MODAL,
  status,
});

export const agentLoadLeads = (leads, pagination) => ({
  type: AGENT_LOAD_LEADS,
  leads,
  pagination,
});

export const agentLoadLeadsStatuses = statuses => ({
  type: AGENT_LOAD_LEADS_BY_STATUSES,
  statuses,
});


export const agentResetLeads = () => ({
  type: AGENT_RESET_LEADS,
});


export const agentSearchLeads = search => ({
  type: AGENT_SEARCH_LEADS,
  search,
});


export const agentNewLeadsCount = count => ({
  type: AGENT_NEW_LEADS_COUNT,
  count,
});

