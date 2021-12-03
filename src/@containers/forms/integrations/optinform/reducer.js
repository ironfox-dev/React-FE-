import {CHANGE_OPTION_FORM_FIELD, LOAD_OPTIN_FORM, SAVE_OPTIN_FORM} from "./actions";
import {IntegrationForm} from "@models/optin-form";

const initState = {
  form: {
    title: 'Integration OptIn Form',
    show: false,
    id: '',
    dealId: '',
    campaignId: '',
    uuid: '',
    integrationForm: IntegrationForm,
  }
};

const optionForm = (state = initState, action) => {
  switch (action.type) {
    case LOAD_OPTIN_FORM: {
      let integration = {};
      if (action.form.integration_config) {
        integration = JSON.parse(action.form.integration_config);
      }

      return {
        ...state,
        form: {
          ...state.form,
          ...action.form,
          integrationForm: {
            ...integration,
          }
        }
      }
    }
    case CHANGE_OPTION_FORM_FIELD: {
      return {
        ...state,
        form: {
          ...state.form,
          integrationForm: {
            ...state.form.integrationForm,
            [action.field]: {
              ...state.form.integrationForm[action.field],
              ...action.fieldData,
            }
          }
        }
      }
    }
    case SAVE_OPTIN_FORM: {
      return {
        ...state,
        form: {
          ...state.form,
          ...action.form,
          show: false,
        }
      }
    }
    default: {
      return state;
    }
  }
};

export default optionForm;
