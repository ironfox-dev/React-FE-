export const ADD_SESSION_TOKEN = 'ADD_SESSION_TOKEN';
export const REMOVE_SESSION_TOKEN = 'REMOVE_SESSION_TOKEN';

export const addSessionToken = tokenData => ({
  type: ADD_SESSION_TOKEN,
  tokenData,
});

export const removeSessionToken = () => ({
  type: REMOVE_SESSION_TOKEN,
});
