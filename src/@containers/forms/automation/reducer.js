import * as R from 'ramda';
import {
  CHANGE_AUTOMATION_ACTION,
  LOAD_AUTOMATION_ACTION,
  SAVED_AUTOMATION_ACTION
} from './actions';

import { DELAY_TYPE_TIME } from "./delayTypes";
import { TYPE_SMS_MESSAGE } from "./actionTypes";
import { LEAD_REPLY_TYPE_NONE } from "./leadReplyType";

const initState = {
  form: {
    show: false,
    title: '',
    id: '',
    deal_id: '',
    parent_id: '',
    type: TYPE_SMS_MESSAGE,
    lead_reply_type: LEAD_REPLY_TYPE_NONE,
    is_root: false,
    object: '',
    delay_time: '',
    stop_on_manual_contact: false,
    delay_type: DELAY_TYPE_TIME,
    saved: false,
  },
  required: {
    deal_id: true,
    type: true,
  }
};

const agentForm = (state = initState, action) => {
  switch (action.type) {
    case LOAD_AUTOMATION_ACTION: {
      return {
        ...state,
        form: {
          ...R.pick(['lead_reply_type', 'type', 'stop_on_manual_contact', 'delay_type'], state.form),
          ...action.form,
          title: !action.form.id ? 'Create Action' : 'Edit Action',
          saved: false,
        }
      };
    }
    case CHANGE_AUTOMATION_ACTION: {
      return {
        ...state,
        form: {
          ...state.form,
          ...action.form,
          saved: false,
        }
      }
    }
    case SAVED_AUTOMATION_ACTION: {
      return {
        ...state,
        form: {
          ...state.form,
          ...action.form,
          show: false,
          saved: true,
        }
      };
    }
    default: {
      return state;
    }
  }
};

export default agentForm;
