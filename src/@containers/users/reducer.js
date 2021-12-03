import {LOAD_USERS, FILTER_USERS, GOTO_USER_PAGE, SEARCH_USERS, TOGGLE_SHOW_DELETED_USERS} from './actions';

const initState = {
  users: [],
  pagination: {
    current_page: 1,
    per_page: 10,
    last_page: 1,
  },
  query: {
    search: '',
    showDeleted: false,
    sort: {},
  }
};

const users = (state = initState, action) => {
  switch (action.type) {
    case LOAD_USERS: {
      return {
        ...state,
        users: [...action.users],
        pagination: action.pagination,
      };
    }
    case GOTO_USER_PAGE: {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          current_page: action.page
        },
      };
    }
    case FILTER_USERS: {
      return {
        ...state,
        query: {
          ...state.query,
          ...action,
          sort: {
            ...state.query.sort,
            [action.field]: (state.query.sort[action.field] === false ? null : !state.query.sort[action.field]),
          },
        },
      };
    }
    case SEARCH_USERS: {
      return {
        ...state,
        query: {
          ...state.query,
          search: action.search,
        },
      };
    }
    case TOGGLE_SHOW_DELETED_USERS: {
      return {
        ...state,
        query: {
          ...state.query,
          showDeleted: !state.query.showDeleted,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default users;
