import { sendMessage } from '../../messages/thunks';
import * as actions  from './actions';
import {api, Auth} from "@services";
import {loadAgents} from "@containers/agents/thunks";


export const saveAgent = form => (dispatch) => {
  try {
    if (form.id) {
      dispatch(updateAgent(form));
    } else {
      dispatch(createAgent(form));
    }
  } catch (e) {
    dispatch(sendMessage(e.message, true));
  }
};

export const updateAgent = form => {
  return async dispatch => {
    try {
      console.log("updateAgent: ", form);
      await api.patch(`/v1/${Auth.role}/agents/${form.id}`, form);
      await dispatch(actions.savedAgent());
      await dispatch(loadAgents());
      dispatch(sendMessage('Agent account was updated'));
    } catch (e) {
      await dispatch(sendMessage(e.message, true));
    }
  }
};

export const createAgent = form => {
  return async dispatch => {
    try {
      await api.post(`/v1/${Auth.role}/agents`, form);
      dispatch(sendMessage('Success! Credentials sent to agent email'));
      await dispatch(actions.savedAgent());
      await dispatch(loadAgents());
    } catch (e) {
      await dispatch(sendMessage(e.message, true));
    }
  }
};
