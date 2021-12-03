export const LOAD_OPTIN_FORM = 'LOAD_OPTIN_FORM';
export const CHANGE_OPTION_FORM_FIELD = 'CHANGE_OPTION_FORM_FIELD';
export const SAVE_OPTIN_FORM = 'SAVE_OPTION_FORM';

export const loadForm = form => ({
  type: LOAD_OPTIN_FORM,
  form,
});

export const changeOptinForm = (field, fieldData) => ({
  type: CHANGE_OPTION_FORM_FIELD,
  field,
  fieldData,
});

export const saveOptionForm = form => ({
  type: SAVE_OPTIN_FORM,
  form,
});
