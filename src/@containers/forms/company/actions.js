export const LOAD_COMPANY_FORM = 'LOAD_COMPANY_FORM';
export const CHANGE_COMPANY = 'CHANGE_COMPANY';
export const SAVED_COMPANY = 'SAVED_COMPANY';


export const loadCompany = form => ({
  type: LOAD_COMPANY_FORM,
  form,
});
export const changeCompany = form => ({
  type: CHANGE_COMPANY,
  form,
});

export const savedCompany = () => ({
  type: SAVED_COMPANY,
});
