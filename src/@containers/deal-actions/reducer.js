import {FETCH_DEAL_ACTIONS_SUCCESS, FETCH_DEAL_SUCCESS} from "./actions";
import {fromJS, List} from "immutable";

const initState = fromJS({
  actions: [],
  deal: {},
});

const dealActions = (state = initState, action) => {
  switch (action.type) {
    case FETCH_DEAL_ACTIONS_SUCCESS: {
      return state.set('actions', fromJS(action.actions))
    }
    case FETCH_DEAL_SUCCESS: {
      return state.set('deal', fromJS(action.deal))
    }
    default:
  }
  return state;
};

export default dealActions;
