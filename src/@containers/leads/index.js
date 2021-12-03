import { connect } from 'react-redux';
import * as thunks from './thunks';
import * as actions from './actions';
import {getSelectBoxStatuses} from "./selectors";

const mapStateToProps = state => ({
  leads: state.leads.leads,
  twilioToken: state.leads.twilioToken,
  newLeadsCount: state.leads.newLeadsCount,
  agentLeads: state.leads.agentLeads,
  pagination: state.leads.pagination,
  statuses: state.leads.statuses,
  selectBoxStatuses: getSelectBoxStatuses(state),
  selectBoxDates: state.agents.selectBoxDates,
  query: state.leads.query,
  openModal: state.leads.openModal,
  openModalStatus: state.leads.openModalStatus,
});

const mapDispatchToProps = dispatch => ({
  loadLeads: () => dispatch(thunks.loadLeads()),
  fetchTwilioTokenBy: (id) => dispatch(thunks.loadTwilioToken(id)),
  delete: (companyId, id) => dispatch(thunks.deleteLead(companyId, id)),
  filterLeads: filters => dispatch(thunks.filterLeads(filters)),
  searchLeads: search => dispatch(thunks.searchLeads(search)),
  gotoPage: activePage => dispatch(thunks.gotoPage(activePage)),
  toggleShowDeleted: () => dispatch(thunks.toggleShowDeleted()),
  sort: field => dispatch(thunks.sortLeads(field)),
  openModal: open => dispatch(actions.openLeadModal(open)),
  searchAgentLeads: search => dispatch(thunks.searchAgentLeads(search)),
  filterAgentLeads: filters => dispatch(thunks.filterAgentLeads(filters)),
  agentLeadsByStatuses: statuses => dispatch(thunks.agentLeadsByStatuses(statuses)),
  scrollToPage: page => dispatch(thunks.scrollToPage(page)),
  exportTo: (payload) => dispatch(thunks.exportTo(payload)),
  reportPoll: uuid => dispatch(thunks.reportPoll(uuid)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
);
