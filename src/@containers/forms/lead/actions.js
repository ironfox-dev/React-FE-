export const LOAD_LEAD = 'LOAD_LEAD';
export const CHANGE_LEAD = 'CHANGE_LEAD';
export const SAVED_LEAD = 'SAVED_LEAD';

export const loadLead = form => ({
  type: LOAD_LEAD,
  form,
});

export const changeLead = form => ({
  type: CHANGE_LEAD,
  form,
});

export const savedLead = () => ({
  type: SAVED_LEAD,
});
