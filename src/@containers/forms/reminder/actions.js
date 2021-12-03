export const LOAD_REMINDER = 'LOAD_REMINDER';
export const CHANGE_REMINDER = 'CHANGE_REMINDER';
export const SAVED_REMINDER = 'SAVED_REMINDER';


export const loadReminder = form => ({
  type: LOAD_REMINDER,
  form,
});

export const savedReminder = () => ({
  type: SAVED_REMINDER,
});

export const changeReminder = form => ({
  type: CHANGE_REMINDER,
  form,
});
