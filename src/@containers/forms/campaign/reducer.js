import {CHANGE_CAMPAIGN, LOAD_CAMPAIGN, SAVED_CAMPAIGN} from './actions';
import {integrations} from "./integrations";

const initState = {
  form: {
    show: false,
    id: '',
    dealId: '',
    companyId: '',
    name: '',
    integration: '',
    agents: [],
  },
  integrationTypes: integrations,
  required: {
    name: true,
    integration: true,
    agents: true,
  }
};

const campaignForm = (state = initState, action) => {
  switch (action.type) {
    case LOAD_CAMPAIGN: {
      return {
        ...state,
        form: {
          ...action.form,
          title: !action.form.id ? 'Create Integration' : 'Edit Integration',
        },
      };
    }
    case CHANGE_CAMPAIGN: {
      return {
        ...state,
        form: {
          ...state.form,
          ...action.form,
        },
      };
    }
    case SAVED_CAMPAIGN: {
      return {
        ...state,
        form: {
          ...state.form,
          show: false
        }
      };
    }
    default: {
      return state;
    }
  }
};

export default campaignForm;
