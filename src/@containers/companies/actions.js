export const ADD_COMPANIES = 'ADD_COMPANIES';
export const GOTO_COMPANIES_PAGE = 'GOTO_COMPANIES_PAGE';
export const SORT_COMPANIES = 'SORT_COMPANIES';
export const SEARCH_COMPANIES = 'SEARCH_COMPANIES';
export const TOGGLE_SHOW_DELETED = 'TOGGLE_WITH_DELETED';
export const OPEN_COMPANY_MODAL = 'OPEN_COMPANY_MODAL';
export const ADD_SELECT_BOX_COMPANIES = 'ADD_SELECT_BOX_COMPANIES';
export const ADD_SELECT_BOX_TIMEZONES = 'ADD_SELECT_BOX_TIMEZONES';
export const LOAD_COMPANY = 'LOAD_COMPANY';
export const LOAD_COMPANY_CAMPAIGNS = 'LOAD_COMPANY_CAMPAIGNS';
export const LOAD_COMPANY_GRAPH_CONTACTED_LEADS_AVERAGE = 'LOAD_COMPANY_GRAPH_CONTACTED_LEADS_AVERAGE';
export const LOAD_COMPANY_LEAD_STATS = 'LOAD_COMPANY_LEAD_STATS';
export const ADD_COMPANY_LEAD_STATS = 'LOAD_COMPANY_LEAD_STATS';

export const addCompanies = (companies, pagination) => ({
  type: ADD_COMPANIES,
  companies,
  pagination,
});

export const addCompanyLeadStats = (companyLeadStats) => ({
  type: ADD_COMPANY_LEAD_STATS,
  companyLeadStats,
});

export const loadCompanyCampaigns = companyId => ({
  type: LOAD_COMPANY_CAMPAIGNS,
  companyId
});
export const gotoCompaniesPage = page => ({
  type: GOTO_COMPANIES_PAGE,
  page
});

export const addSelectBoxCompanies = companies => ({
  type: ADD_SELECT_BOX_COMPANIES,
  companies,
});

export const addSelectBoxTimezones = timezones => ({
  type: ADD_SELECT_BOX_TIMEZONES,
  timezones,
});

export const searchCompanies = search => ({
  type: SEARCH_COMPANIES,
  search,
});

export const sortCompanies = field => ({
  type: SORT_COMPANIES,
  field,
});
export const openCompanyModal = open => ({
  type: OPEN_COMPANY_MODAL,
  open,
});

export const toggleShowDeleted = () => ({
  type: TOGGLE_SHOW_DELETED,
});

export const loadCompany = company => ({
  type: LOAD_COMPANY,
  company
});
export const loadCompanyLeadContactedLeadsAverage = (graphData) => ({
  type: LOAD_COMPANY_GRAPH_CONTACTED_LEADS_AVERAGE,
  graphData
});
