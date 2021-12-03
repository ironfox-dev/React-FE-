import axios from 'axios';
import * as R from 'ramda';
import {SessionStorage} from "@services";

const axiosMiddleWare = ({ getState }) => next => async (action) => {
  const token = R.pathOr(false, ['token'], SessionStorage.getItem('session'));
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    axios.defaults.headers.common.Authorization = null;
  }
  next(action);
};

export default axiosMiddleWare;