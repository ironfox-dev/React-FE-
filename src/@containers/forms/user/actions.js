export const LOAD_USER_FORM = 'LOAD_USER_FORM';
export const CHANGE_USER = 'CHANGE_USER';
export const SAVED_USER = 'SAVED_USER';


export const loadUser = form => ({
  type: LOAD_USER_FORM,
  form,
});
export const changeUser = form => ({
  type: CHANGE_USER,
  form,
});

export const savedUser = () => ({
  type: SAVED_USER,
});
