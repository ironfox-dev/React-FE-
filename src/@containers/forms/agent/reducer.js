import {
  CHANGE_AGENT,
  LOAD_AGENT, SAVED_AGENT,
} from './actions';

const initState = {
  form: {
    show: false,
    title: '',
    id: '',
    companies: [],
    new_companies: [],
    avatar: '',
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    twilio_mobile_number: '',
  },
  required: {
    name: true,
    email: true,
  }
};

const agentForm = (state = initState, action) => {
  switch (action.type) {
    case LOAD_AGENT: {
      if (action.form.companies) {
        action.form.companies = action.form.companies.map(company => company.id);
      }

      return {
        ...state,
        form: {
          ...action.form,
          title: !action.form.id ? 'Create Agent' : 'Edit Agent',
        }
      };
    }
    case CHANGE_AGENT: {
      return {
        ...state,
        form: {
          ...state.form,
          ...action.form
        }
      }
    }
    case SAVED_AGENT: {
      return {
        ...state,
        form: {
          ...state.form,
          ...action.form,
          show: false,
        }
      };
    }
    default: {
      return state;
    }
  }
};

export default agentForm;
