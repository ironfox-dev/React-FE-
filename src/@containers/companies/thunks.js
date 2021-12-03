import * as actions from './actions';
import { hideLoader, showLoader } from '../loader/actions';
import { sendMessage } from '../messages/thunks';
import {addBreadCrumb} from "../breadcrumb/actions";
import {api, Auth} from "@services";
import {
  fetchAgencyCompanies, agencyLockCompany, fetchAgencyCompany, fetchAgencyCompanyGraph,
  fetchCompanyGraph, fetchTimezones, fetchAgencyCompanyLeadStats, fetchAgencyCompaniesOfAgent
} from "./api";

export const deleteCompany = id => async dispatch => {
  try {
    dispatch(showLoader());
    const response = await api.delete(`/v1/${Auth.role}/companies/${id}`);
    if (response.data) {
      await dispatch(getCompanies());
    }
  } catch (e) {
    dispatch(sendMessage(e.message, true));
  }
  dispatch(hideLoader());
};

export const updateLockStatusCompany = form => async (dispatch) => {
  try {
    await agencyLockCompany(form);
    dispatch(sendMessage('Company lock status updated'));
    await dispatch(getCompanies());
  } catch (e) {
    dispatch(sendMessage(e.message, true));
  }
};

export const getCompanies = () => async (dispatch, getState) => {
  try {

    const {pagination, query} = getState().companies;

    dispatch(showLoader());
    const response = await fetchAgencyCompanies({
      per_page: pagination.per_page,
      current_page: pagination.current_page,
      showDeleted: (query.showDeleted ? 1 : null),
      search: (query.search ? query.search : ''),
      ...query.sort,
    });
    const { data, ...rest } = response.data;
    await dispatch(actions.addCompanies(data, rest));
  } catch (e) {
    dispatch(sendMessage(e.message, true));
  }
  dispatch(hideLoader());
};

export const getCompanyLeadStats = (companyId, fromDate, toDate, agentId = null) => async (dispatch) => {
  try {
    const response = await fetchAgencyCompanyLeadStats({
      companyId, fromDate, toDate, agentId
    });

    await dispatch(actions.addCompanyLeadStats(response.data));

  } catch (e) {
    dispatch(sendMessage(e.message, true));
  }
};


export const gotoCompaniesPage = activePage => async dispatch => {
  await dispatch(actions.gotoCompaniesPage(activePage));
  await dispatch(getCompanies());
};

export const searchCompanies = search => async (dispatch) => {
  await dispatch(actions.searchCompanies(search));
  await dispatch(getCompanies());
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

export const loadSelectTimezones = (search) => async dispatch => {
  try {
    const response = await fetchTimezones({
      search: search || null,
    });
    const { data } = response;
    dispatch(actions.addSelectBoxTimezones(data));
  } catch (e) {
    dispatch(sendMessage(e.message, true));
  }
};

export const onSortCompanies = field => async (dispatch, getState) => {
  await dispatch(actions.sortCompanies(field));
  dispatch(getCompanies());
};
export const toggleShowDeleted = () => async (dispatch, getState) => {
  await dispatch(actions.toggleShowDeleted());
  dispatch(getCompanies());
};

export const getCompanyBy = (id, beadCrumbData) => async dispatch => {
  try {
    const response = await fetchAgencyCompany(id);
    await dispatch(actions.loadCompany(response.data));

    if (beadCrumbData) {
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
export const getCompanyGraph = (graphContext, companyId, filters) => async dispatch => {
  try {
    const response =
      await (Auth.isAgency
        ? fetchAgencyCompanyGraph(companyId, filters)
        : fetchCompanyGraph(filters));
    console.log("fetchAgencyCompanyGraph response.data: ", response.data);
    await dispatch(actions.loadCompanyLeadContactedLeadsAverage(response.data));
    if (graphContext) {
      graphContext.data = response.data;
      await graphContext.update();
    }
  } catch (e) {
    dispatch(sendMessage(e.message, true))
  }
};
