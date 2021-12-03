import { ADD_BREADCRUMB, RESET_BREADCRUMB } from './actions';

const initialState = {
  breadcrumbs: [
    {
      name: 'Dashboard',
      path: '/dashboard',
      active: true,
    },
  ],
};

const breadCrumb = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BREADCRUMB: {
      let { breadcrumbs } = state;
      if (action.reset) {
        breadcrumbs = [];
        state.breadcrumbs[0].active = false;
        breadcrumbs.push(state.breadcrumbs[0], {
          ...action.crumb,
          active: true,
        });
      } else {
        breadcrumbs.map(crumb => (crumb.active = false && crumb));
        breadcrumbs.push({
          ...action.crumb,
          active: true,
        });
      }
      return {
        ...state,
        breadcrumbs: [...breadcrumbs],
      };
    }
    case RESET_BREADCRUMB: {
      state.breadcrumbs[0].active = true;
      return {
        ...state,
        breadcrumbs: [state.breadcrumbs[0]],
      };
    }
    default: {
      return state;
    }
  }
};

export default breadCrumb;
