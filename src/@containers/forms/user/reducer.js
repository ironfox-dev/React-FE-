import {
  CHANGE_USER,
  LOAD_USER_FORM, SAVED_USER,
} from './actions';

const initState = {
  form: {
    role: 'AGENCY',
    title: '',
    show: false,
    id: '',
    name: '',
    email: '',
    phone: '',
    avatar: '',
    password: '',
    password_confirmation: '',
    subscription_type: '',
    max_agency_companies: '',
  },
  required: {
    name: true,
    email: true,
    password: true,
    password_confirmation: true,
  },
};

const userForm = (state = initState, action) => {
  switch (action.type) {
    case LOAD_USER_FORM: {
      return {
        ...state,
        form: {
          ...initState.form,
          ...action.form,
          title: !action.form.id ? 'Create User' : 'Edit User',
        },
        required: {
          ...state.required,
          password: !action.form.id,
          password_confirmation: !action.form.id,
        },
      };
    }
    case CHANGE_USER: {
      return {
        ...state,
        form: {
          ...state.form,
          ...action.form,
        },
      };
    }
    case SAVED_USER: {
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

export default userForm;
