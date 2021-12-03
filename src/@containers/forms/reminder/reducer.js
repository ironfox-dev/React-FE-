import {
  LOAD_REMINDER,
  CHANGE_REMINDER,
  SAVED_REMINDER,
} from './actions';
import * as moment from "moment";

const initState = {
  form: {
    show: false,
    title: '',
    id: '',
    name: '',
    time: '',
    leadId: '',
    companyID: ''
  },
  required: {
    name: true,
    time: true,
  }
};

const reminderForm = (state = initState, action) => {
  switch (action.type) {
    case LOAD_REMINDER: {
      if (action.form.time)
        action.form.time = moment.utc(action.form.time).local().format('YYYY-MM-DD hh:mm:ss');
      return {
        ...state,
        form: {
          ...action.form,
          title: !action.form.id ? 'Create Reminder' : 'Edit Reminder',
        }
      };
    }
    case CHANGE_REMINDER: {
      return {
        ...state,
        form: {
          ...state.form,
          ...action.form
        }
      }
    }
    case SAVED_REMINDER: {
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

export default reminderForm;
