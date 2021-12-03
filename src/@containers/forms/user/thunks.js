import { sendMessage } from '../../messages/thunks';
import * as actions from './actions';
import { loadUsers } from '@containers/users/thunks';
import * as api from "./api";

export const saveUser = form => (dispatch) => {
  try {
    if (form.id) {
      dispatch(updateUser(form));
    } else {
      dispatch(createUser(form));
    }
  } catch (e) {
    sendMessage(e.message, true);
  }
};

export const createUser = form => async (dispatch) => {
  try {
    await api.createUser(form);
    dispatch(sendMessage('Successfully saved'));
    dispatch(actions.savedUser());
    await dispatch(loadUsers());
  } catch (e) {
    dispatch(sendMessage(e.message, true));
  }
};

export const updateUser = form => async (dispatch) => {
  try {
    await api.updateUser(form);
    dispatch(sendMessage('Successfully saved'));
    dispatch(actions.savedUser());
    await dispatch(loadUsers());
  } catch (e) {
    dispatch(sendMessage(e.message, true));
  }
};
