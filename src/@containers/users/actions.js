export const LOAD_USERS = 'LOAD_USERS';
export const FILTER_USERS = 'FILTER_USERS';
export const SORT_USERS = 'SORT_USERS';
export const SEARCH_USERS = 'SEARCH_USERS';
export const GOTO_USER_PAGE = 'GOTO_USER_PAGE';
export const TOGGLE_SHOW_DELETED_USERS = 'TOGGLE_SHOW_DELETED_USERS';

export const loadUsers = (users, pagination) => ({
  type: LOAD_USERS,
  users,
  pagination,
});

export const filterUsers = (filters) => ({
  type: FILTER_USERS,
  filters,
});

export const sortUsers = (field) => ({
  type: SORT_USERS,
  field,
});

export const gotoUserPage = page => ({
  type: GOTO_USER_PAGE,
  page
});
export const searchUsers = search => ({
  type: SEARCH_USERS,
  search
});

export const toggleShowDeleted = () => ({
  type: TOGGLE_SHOW_DELETED_USERS,
});