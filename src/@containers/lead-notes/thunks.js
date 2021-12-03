import {sendMessage} from "../messages/thunks";
import {Auth} from "@services";
import * as actions from './actions';
import {addBreadCrumb} from "../breadcrumb/actions";
import {hideLoader, showLoader} from "../loader/actions";
import {
  createAgencyCompanyLeadNote,
  createCompanyLeadNote,
  fetchAgencyCompanyLead,
  fetchCompanyLead
} from "./api";

export const loadLead = (companyId, leadId, skip = false, resetSmsReplayView = false) => async dispatch => {
  try {
    await dispatch(showLoader());
    const response = await (
      Auth.isAgency
      ? fetchAgencyCompanyLead(companyId, leadId, +resetSmsReplayView)
      : fetchCompanyLead(leadId, +resetSmsReplayView)
    );

    const { data } = response;
    await dispatch(actions.loadLead(data));
    if (!skip) {
      await dispatch(addBreadCrumb({
        name: data.fullname || data.email || data.phone,
        path: '/'
      }, false))
    }
  } catch (e) {
    dispatch(sendMessage(e.message, true));
  }
  await dispatch(hideLoader());
};

export const createLeadNote = form => async (dispatch, getState) => {
  try {
    const { lead } = getState().leadNotes;
    await (Auth.isAgency
      ? createAgencyCompanyLeadNote(lead.company.id, lead.id, form)
      : createCompanyLeadNote(lead.id, form));

    dispatch(loadLead(lead.company.id, lead.id, true));
    await dispatch(sendMessage('Successfully added'));
  } catch (e) {
    dispatch(sendMessage(e.message, true));
  }
};
