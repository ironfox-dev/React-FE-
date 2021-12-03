import {
  CHANGE_COMPANY,
  LOAD_COMPANY_FORM, SAVED_COMPANY,
} from './actions';

const initState = {
  form: {
    title: '',
    show: false,
    id: '',
    name: '',
    email: '',
    phone: '',
    avatar: '',
    twilio_sid: '',
    twilio_token: '',
    twilio_mobile_number: '',
    password: '',
    password_confirmation: '',
  },
  required: {
    name: true,
    email: true,
    phone: true,
    password: true,
    password_confirmation: true,
  },
};

const companyForm = (state = initState, action) => {
  switch (action.type) {
    case LOAD_COMPANY_FORM: {
      return {
        ...state,
        form: {
          ...action.form,
          title: !action.form.id ? 'Create Company' : 'Edit Company',
        },
        required: {
          ...state.required,
          password: !action.form.id,
          password_confirmation: !action.form.id,
        },
      };
    }
    case CHANGE_COMPANY: {
      return {
        ...state,
        form: {
          ...state.form,
          ...action.form,
        },
      };
    }
    case SAVED_COMPANY: {
      return {
        ...state,
        form: {
          ...state.form,
          ...action.form,
          show: false,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default companyForm;
