import { connect } from 'react-redux';
import * as thunks from './thunks';
import * as actions from './actions';
import {companyLeadStatsRecords, selectBoxCompanies, selectBoxDealCampaigns, selectBoxTimezones} from './selectors';

const mapStateToProps = state => ({
  company: state.companies.company,
  companyLeadStats: state.companies.companyLeadStats,
  companyLeadStatsRecords: companyLeadStatsRecords(state),
  companies: state.companies.companies,
  selectBoxCompanies: selectBoxCompanies(state),
  selectBoxDealCampaigns: selectBoxDealCampaigns(state),
  selectBoxTimezones: selectBoxTimezones(state),
  pagination: state.companies.pagination,
  query: state.companies.query,
  openModal: state.companies.openModal,
  companyGraph: state.companies.graphContactedLeadsAverage,
  companyAverageResponseTime: state.companies.averageResponseTime,
});

const mapDispatchToProps = dispatch => ({
  loadCompanies: () => dispatch(thunks.getCompanies()),
  getCompanyLeadStats: (companyId, fromDate, toDate, agentId = null) => dispatch(thunks.getCompanyLeadStats(companyId, fromDate, toDate, agentId)),
  searchCompanies: search => dispatch(thunks.searchCompanies(search)),
  updateLockStatusCompany: company => dispatch(thunks.updateLockStatusCompany(company)),
  loadSelectBoxCompanies: (search, agentId = null) => dispatch(thunks.loadSelectBoxCompanies(search, agentId)),
  loadSelectBoxTimezones: (search) => dispatch(thunks.loadSelectTimezones(search)),
  gotoCompaniesPage: activePage => dispatch(thunks.gotoCompaniesPage(activePage)),
  sort: field => dispatch(thunks.onSortCompanies(field)),
  openCompanyModal: open => dispatch(actions.openCompanyModal(open)),
  deleteCompany: id => dispatch(thunks.deleteCompany(id)),
  toggleShowDeleted: () => dispatch(thunks.toggleShowDeleted()),
  getCompanyBy: (id, breadCrumb) => dispatch(thunks.getCompanyBy(id, breadCrumb)),
  getCompanyGraph: (graphContext, companyId, filters) => dispatch(thunks.getCompanyGraph(graphContext, companyId, filters)),
  loadCompanyCampaigns: (companyId) => dispatch(actions.loadCompanyCampaigns(companyId)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
);
