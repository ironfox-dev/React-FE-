import * as actions from './actions';
import {hideLoader, showLoader} from '../loader/actions';
import {sendMessage} from '../messages/thunks';
import {Auth, config} from '@services';
import * as api from './api';

export const loadLeads = () => async (dispatch, getState) => {
    dispatch(showLoader());
    try {
        const {query, pagination} = getState().leads;

        const response = await api.fetchLeads({
            ...query.filters,
            ...query.sort,
            search: query.search,
            showDeleted: (query.showDeleted ? query.showDeleted : null),
            per_page: pagination.per_page,
            current_page: pagination.current_page,
        });

        const {data, ...rest} = response.data;
        dispatch(actions.loadLeads(data, rest));
    } catch (e) {
        dispatch(sendMessage(e.message, true));
    }
    dispatch(hideLoader());
};

export const loadTwilioToken = (leadId) => async dispatch => {
    const response = await api.getTwilioTokenBy(leadId);

    const { token } = response.data;
    dispatch(actions.putTwilioToke(token));
}

export const deleteLead = (companyId, id) => async (dispatch) => {
    try {
        if (Auth.isAgency) {
            await api.deleteAgencyCompanyLead(companyId, id);
        } else {
            await api.deleteCompanyLead(id);
        }
        await dispatch(loadLeads());
        dispatch(sendMessage('Successfully deleted'));
    } catch (e) {
        dispatch(sendMessage(e.message, true));
    }
};

export const filterLeads = filters => async (dispatch) => {
    await dispatch(actions.filterLeads(filters));
    await dispatch(loadLeads());
};

export const searchLeads = search => async (dispatch) => {
    await dispatch(actions.searchLeads(search));
    await dispatch(loadLeads());
};

export const gotoPage = activePage => async (dispatch) => {
    await dispatch(actions.gotoPage(activePage));
    await dispatch(loadLeads());
};

export const toggleShowDeleted = () => async (dispatch) => {
    await dispatch(actions.toggleShowDeleted());
    await dispatch(loadLeads());
};

export const sortLeads = field => async (dispatch) => {
    await dispatch(actions.sortLeads(field));
    await dispatch(loadLeads());
};


export const loadAgentLeads = () => async (dispatch, getState) => {
    dispatch(showLoader());
    try {
        const {query, pagination, agentLeadStatuses} = getState().leads;

        const response = await api.fetchLeads({
            statuses: agentLeadStatuses.join(','),
            search: query.search,
            per_page: 100,
            current_page: pagination.current_page,
            startDate: query.filters.startDate,
            endDate: query.filters.endDate
        });

        const {data, ...rest} = response.data.leads;
        const {new_leads_count} = response.data;

        dispatch(actions.agentLoadLeads(data, rest));
        dispatch(actions.agentNewLeadsCount(new_leads_count));
    } catch (e) {
        dispatch(sendMessage(e.message, true));
    }
    dispatch(hideLoader());
};

export const searchAgentLeads = search => async dispatch => {
    await dispatch(actions.agentSearchLeads(search));
    await dispatch(loadAgentLeads());
};

export const filterAgentLeads = filters => async dispatch => {
    await dispatch(actions.filterLeads(filters));
    await dispatch(loadAgentLeads());
};

export const agentLeadsByStatuses = (statuses) => async dispatch => {
    await dispatch(actions.agentResetLeads());
    await dispatch(actions.agentLoadLeadsStatuses(statuses));
    await dispatch(actions.gotoPage(1));
    await dispatch(loadAgentLeads());
};

export const scrollToPage = page => async (dispatch) => {
    await dispatch(actions.gotoPage(page));
    await dispatch(loadAgentLeads());
};

export const exportTo = (payload) => async dispatch => {
    try {
        const report = await api.exportTo(payload);
        dispatch(reportPoll(report.data.uuid))
    } catch (e) {
        console.log(e.message);
    }
};

export const reportPoll = uuid => async dispatch => {
    try {
        const report = await api.reportPoll(uuid);
        if (['NONE', 'IN_PROGRESS'].includes(report.data.status)) {
            setTimeout(() => dispatch(reportPoll(uuid)), 1000);
        } else {
            window.location = `${config.get('REACT_APP_API_SERVER')}/v1/reports/${report.data.uuid}/download`;
        }
    } catch (e) {
        dispatch(sendMessage(e.message, true));
    }
};
