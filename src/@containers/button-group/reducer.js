const initState = {};
const ADD_ACTIVE_GROUP_BUTTON = 'ADD_ACTIVE_GROUP_BUTTON';
const HIDE_ALL_GROUP_BUTTONS = 'HIDE_ALL_GROUP_BUTTONS';

export const addActiveGroupButton = key => ({
  type: ADD_ACTIVE_GROUP_BUTTON,
  key,
});
export const hideAll = () => ({
  type: HIDE_ALL_GROUP_BUTTONS,
});

export default function buttonGroup(state = initState, action) {
  switch (action.type) {
    case HIDE_ALL_GROUP_BUTTONS: {
      return {};
    }
    case ADD_ACTIVE_GROUP_BUTTON: {
      return {
        [action.key]: !state[action.key],
      };
    }
    default: {
      return state;
    }
  }
}
