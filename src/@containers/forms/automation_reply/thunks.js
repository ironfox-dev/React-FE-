import { sendMessage } from '../../messages/thunks';
import { fetchDealAction } from "../../deal-actions/thunks";
import * as actions  from './actions';
import {api} from "@services";
import {loadAutomationAction} from "./actions";


export const saveAutomationAction = form => (dispatch) => {
  try {
    if (form.id) {
      dispatch(updateAutomationAction(form));
    } else {
      dispatch(createAutomationAction(form));
    }
    dispatch(fetchDealAction(form.deal_id));
  } catch (e) {
    dispatch(sendMessage(e.message, true));
  }
};


export const deleteRecord = form => async (dispatch) => {
  try {
    await api.delete(`/v1/company/deals/${form.deal_id}/actions/${form.id}`);
    dispatch(fetchDealAction(form.deal_id));
    dispatch(loadAutomationAction({ show: false }));
  } catch (e) {
    dispatch(sendMessage(e.message, true));
  }
};

export const updateAutomationAction = form => {
  return async dispatch => {
    try {
      await api.patch(`/v1/company/deals/${form.deal_id}/actions/${form.id}`, form);
      await dispatch(actions.savedAutomationAction());
      dispatch(sendMessage('Action updated!'));
    } catch (e) {
      await dispatch(sendMessage(e.message, true));
    }
  }
};

export const createAutomationAction = form => {
  return async dispatch => {
    try {
      await api.post(`/v1/company/deals/${form.deal_id}/actions`, form);
      dispatch(sendMessage('Success! Credentials sent to agent email'));
      await dispatch(actions.savedAutomationAction());
    } catch (e) {
      await dispatch(sendMessage(e.message, true));
    }
  }
};
