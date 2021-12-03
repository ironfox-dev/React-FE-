import * as R from 'ramda';

// eslint-disable-next-line import/prefer-default-export
export const disableAutoComplete = () => {
  const forms = document.getElementsByTagName('form') || [];
  const inputs = document.getElementsByTagName('input') || [];

  R.map(element => (element.setAttribute('autocomplete', 'off')), forms);
  R.map(element => (element.setAttribute('data-lpignore', 'true')), inputs);
};
