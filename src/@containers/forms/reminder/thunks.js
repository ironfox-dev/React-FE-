import { sendMessage } from '../../messages/thunks';
import * as actions  from './actions';
import {api} from "@services";
import {loadLead} from "../../lead-notes/thunks";


export const saveReminder = form => (dispatch) => {
  try {
    if (form.id) {
      dispatch(updateReminder(form));
    } else {
      dispatch(createReminder(form));
    }
  } catch (e) {
    dispatch(sendMessage(e.message, true));
  }
};

export const createReminder = form => {
  return async dispatch => {
    try {
      await api.post(`/v1/agent/leads/${form.leadId}/reminders`, form);
      dispatch(sendMessage('Successfully added!'));
      await dispatch(actions.savedReminder());
      await dispatch(loadLead(form.companyId, form.leadId, true));
    } catch (e) {
      await dispatch(sendMessage(e.message, true));
    }
  }
};

export const updateReminder = form => {
  return async dispatch => {
    try {
      await api.patch(`/v1/agent/leads/${form.leadId}/reminders/${form.id}`, form);
      await dispatch(actions.savedReminder());
      await dispatch(loadLead(form.companyId, form.leadId, true));
      dispatch(sendMessage('Successfully updated!'));
    } catch (e) {
      await dispatch(sendMessage(e.message, true));
    }
  }
};

export const deleteReminder = form => {
  return async dispatch => {
    try {
      await api.delete(`/v1/agent/leads/${form.leadId}/reminders/${form.id}`);
      await dispatch(actions.savedReminder());
      await dispatch(loadLead(form.companyId, form.leadId, true));
      dispatch(sendMessage('Successfully deleted!'));
    } catch (e) {
      await dispatch(sendMessage(e.message, true));
    }
  }
};
