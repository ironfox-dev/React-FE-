import {sendMessage} from "../messages/thunks";
import { api } from "@services";
import * as actions from './actions';

export const loadUsers = () => async (dispatch, getState) => {
  try {
    const { query, pagination } = getState().users;
    const response = await api.get(`/v1/admin/users`, { params: {
      ...query,
      per_page: pagination.per_page,
      current_page: pagination.current_page,
    } });
    const { data, ...rest } = response.data;
    dispatch(actions.loadUsers(data, rest));

  } catch (e) {
    dispatch(sendMessage(e.message, true));
  }
};

export const deleteUser = userId => async (dispatch) => {
  try {
    await api.delete(`/v1/admin/users/${userId}`);
    dispatch(loadUsers());
  } catch (e) {
    dispatch(sendMessage(e.message, true));
  }
};

export const toggleShowDeleted = () => async dispatch => {
  await dispatch(actions.toggleShowDeleted());
  dispatch(loadUsers());
};

export const filterUsers = filter => async dispatch => {
  try {
    await dispatch(actions.filterUsers(filter));
    dispatch(loadUsers());
  } catch (e) {
    dispatch(sendMessage(e.message, true));
  }
};

export const onSort = field => async dispatch => {
  await dispatch(actions.sortUsers(field));
  dispatch(loadUsers());
};

export const gotoUserPage = activePage => async dispatch => {
  await dispatch(actions.gotoUserPage(activePage));
  await dispatch(loadUsers());
};

export const searchUsers = search => async dispatch => {
  await dispatch(actions.searchUsers(search));
  await dispatch(loadUsers());
};
