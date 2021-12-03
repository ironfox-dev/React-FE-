export const LOAD_AUTOMATION_ACTION = 'LOAD_AUTOMATION_ACTION';
export const CHANGE_AUTOMATION_ACTION = 'CHANGE_AUTOMATION_ACTION';
export const SAVED_AUTOMATION_ACTION = 'SAVED_AUTOMATION_ACTION';


export const loadAutomationAction = form => ({
  type: LOAD_AUTOMATION_ACTION,
  form,
});

export const savedAutomationAction = () => ({
  type: SAVED_AUTOMATION_ACTION,
});

export const changeAutomationAction = form => ({
  type: CHANGE_AUTOMATION_ACTION,
  form,
});
