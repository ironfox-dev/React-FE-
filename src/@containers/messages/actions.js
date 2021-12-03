export const MESSAGE_ERROR = 'MESSAGE_ERROR';
export const MESSAGE_SUCCESS = 'MESSAGE_SUCCESS';


export const messageError = (message) => ({
  type: MESSAGE_ERROR,
  message,
  error: true,
});

export const messageSuccess = (message) => ({
  type: MESSAGE_SUCCESS,
  message,
  error: false,
});
