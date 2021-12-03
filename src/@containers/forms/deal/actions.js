export const LOAD_DEAL = 'LOAD_DEAL';
export const CHANGE_DEAL = 'CHANGE_DEAL';
export const SAVED_DEAL = 'SAVED_DEAL';


export const loadDeal = form => ({
  type: LOAD_DEAL,
  form,
});

export const savedDeal = () => ({
  type: SAVED_DEAL,
});

export const changeDeal = form => ({
  type: CHANGE_DEAL,
  form,
});
