import { HIDE_LOADER, SHOW_LOADER } from './actions';

const initState = {
  ready: true,
};

const loader = (state = initState, action) => {
  switch (action.type) {
    case SHOW_LOADER: {
      return {
        ...state,
        ready: false,
      };
    }
    case HIDE_LOADER: {
      return {
        ...state,
        ready: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default loader;
