import * as actions from './actions';
import {api, Auth} from '@services';
import { hideLoader, showLoader } from '../loader/actions';
import { sendMessage } from '../messages/thunks';
import {addBreadCrumb} from "../breadcrumb/actions";
import {agentLeadGraph, companyAgentLeadGraph,fetchAgencyCompanies} from "./api";
 

export const loadAgents = () => async (dispath, getState) => {
  try {
    dispath(showLoader());
    const { pagination, query } = getState().agents;
    const response = await api.get(`/v1/${Auth.role}/agents`, {
      params: {
        ...query.filters,
        ...query.sort,
        showDeleted: (query.showDeleted ? 1 : null),
        search: query.search,
        current_page: pagination.current_page,
        per_page: pagination.per_page,
      },
    });
    const { data, ...rest } = response.data;
    dispath(actions.addAgents(data, rest));
  } catch (e) {
    dispath(sendMessage(e.message, true));
  }
  dispath(hideLoader());
};

export const loadSelectBoxAgents =
  (filters = { search: '', companyId: '' }) => async (dispath, getState) => {
  try {
    const response = await api.get(`/v1/${Auth.role}/agents`, {
      params: {
        companyId: (filters.companyId ? filters.companyId : null),
        search: filters.search,
        current_page: 1,
        per_page: 100,
      },
    });
    const { data } = response.data;
    dispath(actions.loadSelectBoxAgents(data));
  } catch (e) {
    dispath(sendMessage(e.message, true));
  }
};

export const createAgent = agent => (dispath, getState) => {
  dispath(loadAgents());
};

export const editAgent = (id, agent) => (dispath, getState) => {
  dispath(actions.editAgent(id, agent));
};

export const deleteAgent = (id) => async (dispath, getState) => {
  try {
    await api.delete(`/v1/${Auth.role}/agents/${id}`);
    dispath(loadAgents());
    dispath(sendMessage('Successfully archived!'))
  } catch (e) {
    dispath(sendMessage(e.message, true))
  }
};

export const restoreAgent = (id) => async (dispath, getState) => {
  try {
    await api.get(`/v1/${Auth.role}/agents/${id}/restore`);
    dispath(loadAgents());
    dispath(sendMessage('Successfully restored!'))
  } catch (e) {
    dispath(sendMessage(e.message, true))
  }
};

export const filterAgents = filters => async (dispath, getState) => {
  await dispath(actions.filterAgents(filters));
  await dispath(loadAgents());
};

export const sortAgents = field => async (dispath, getState) => {
  await dispath(actions.sortAgents(field));
  await dispath(loadAgents());
};

export const searchAgents = search => async (dispath, getState) => {
  await dispath(actions.searchAgents(search));
  await dispath(loadAgents());
};

export const gotoPage = activePage => async (dispath, getState) => {
  await dispath(actions.gotoPage(activePage));
  await dispath(loadAgents());
};

export const toggleAgentsShowDeleted = () => async (dispath, getState) => {
  await dispath(actions.toggleAgentsShowDeleted());
  await dispath(loadAgents());
};

export const getAgent = (id, addBreadCrumbOn = false) => async dispatch => {
  try {
    const response = await api.get(`/v1/${Auth.role}/agents/${id}`); 
    await dispatch(actions.loadAgent(response.data));
    if (addBreadCrumbOn) {
      await dispatch(addBreadCrumb({
        name: response.data.name,
        path: '',
        active: true,
      }, false))
    }
  } catch (e) {
    dispatch(sendMessage(e.message, true))
  }
};

export const getAgentGraph = (graphContext, agentId, filters) => async dispatch => {
  try {
    const response = await (Auth.isCompany || Auth.isAgency ? companyAgentLeadGraph(agentId, filters) : agentLeadGraph(filters));
    await dispatch(actions.loadAgentLeadsGraph(response.data));
    if (graphContext) {
      graphContext.data = response.data;
      await graphContext.update();
    }
  } catch (e) {
    dispatch(sendMessage(e.message, true))
  }
}

export const getAgentGraphPie = (graphContext, agentId, filters) => async dispatch => {
  try {
    const response = await (Auth.isCompany || Auth.isAgency ? companyAgentLeadGraph(agentId, filters) : agentLeadGraph(filters));
    await dispatch(actions.loadAgentLeadsGraphPie(response.data));
    if (graphContext) {
      graphContext.data = response.data;
      await graphContext.update();
    }
  } catch (e) {
    dispatch(sendMessage(e.message, true))
  }
};


export const loadSelectBoxCompanies = (search, agentId = null) => async dispatch => {
  try {
    const response = await fetchAgencyCompanies({
      agentId,
      reduced: 1,
      search: search || null,
      per_page: 10000,
    });
    const { data } = response.data;
    dispatch(actions.addSelectBoxCompanies(data));
  } catch (e) {
    dispatch(sendMessage(e.message, true));
  }
};