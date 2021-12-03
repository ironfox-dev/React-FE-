export const ADD_BREADCRUMB = 'ADD_BREADCRUMB';
export const RESET_BREADCRUMB = 'RESET_BREADCRUMB';

export const addBreadCrumb = (crumb, reset = true) => ({
  type: ADD_BREADCRUMB,
  crumb,
  reset,
});

export const resetBreadCrumbToDefault = () => ({
  type: RESET_BREADCRUMB,
});
