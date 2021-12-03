import {
  MESSAGE_ERROR, MESSAGE_SUCCESS,
} from './actions';

const initState = {
  message: null,
  error: false,
};

const messages = (state = initState, action) => {
  switch (action.type) {
    case MESSAGE_ERROR: {
      return {
        ...state,
        error: true,
        message: action.message,
      };
    }
    case MESSAGE_SUCCESS: {
      return {
        ...state,
        error: false,
        message: action.message,
      };
    }
    default: {
      return state;
    }
  }
};

export default messages;
