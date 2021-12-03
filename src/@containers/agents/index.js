import { connect } from 'react-redux';
import * as thunks from './thunks';
import * as actions from './actions';
import { agentCompaniesIds, selectBoxAgents, selectBoxCompanies, agentProfile } from "./selectors";

const mapStateToProps = state => ({
  agents: state.agents.agents,
  agent: state.agents.agent,
  agentCompaniesIds: agentCompaniesIds(state),
  selectBoxAgentCompanies: selectBoxCompanies(state), 
  selectBoxAgents: selectBoxAgents(state),
  selectBoxDates: state.agents.selectBoxDates,
  pagination: state.agents.pagination,
  query: state.agents.query,
  openModalStatus: state.agents.openModalStatus,
  graphContactedLeadsAverage: state.agents.graphContactedLeadsAverage,
  pieGraphContactedLeadsAverage: state.agents.pieGraphContactedLeadsAverage,
  averageResponseTime: state.agents.averageResponseTime,
  agentProfile: agentProfile(state),
});

const mapDispatchToProps = dispatch => ({
  loadAgents: () => dispatch(thunks.loadAgents()),
  getAgent: (id, addBreadCrumb = false) => dispatch(thunks.getAgent(id, addBreadCrumb)),
  filterAgents: filters => dispatch(thunks.filterAgents(filters)),
  search: search => dispatch(thunks.searchAgents(search)),
  sortAgentsBy: sort => dispatch(thunks.sortAgents(sort)),
  gotoPage: activePage => dispatch(thunks.gotoPage(activePage)),
  delete: (agentId) => dispatch(thunks.deleteAgent(agentId)),
  restore: (agentId) => dispatch(thunks.restoreAgent(agentId)),
  edit: (id, agent) => dispatch(thunks.editAgent(id, agent)),
  create: agent => dispatch(thunks.createAgent(agent)),
  openModal: open => dispatch(actions.openAgentModal(open)),
  toggleAgentsShowDeleted: open => dispatch(thunks.toggleAgentsShowDeleted(open)),
  loadSelectBoxAgents: filters => dispatch(thunks.loadSelectBoxAgents(filters)),
  loadSelectBoxCompanies: (search, agentId = null) => dispatch(thunks.loadSelectBoxCompanies(search, agentId)),
  getAgentGraph: (graphContext, agentId, filters) => dispatch(thunks.getAgentGraph(graphContext, agentId, filters)),
  getAgentGraphPie: (graphContext, agentId, filters) => dispatch(thunks.getAgentGraphPie(graphContext, agentId, filters)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
);
