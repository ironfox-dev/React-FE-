import { toast } from 'react-toastify';
import {messageError, messageSuccess} from "./actions";

export const sendMessage = (message, error = false) => (dispatch) => {
  if (error) {
    dispatch(messageError(message));
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  } else {
    dispatch(messageSuccess(message));
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};

export const sendMessageInfo = message => (dispatch) => {
  toast.info(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};


export const sendMessageWarn = message => (dispatch) => {
  toast.warn(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};
