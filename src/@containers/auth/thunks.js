import * as R from 'ramda';
import {api, SessionStorage} from '../../@services';
import {addSessionToken, removeSessionToken} from './actions';
import {sendMessage} from '../messages/thunks';
import {loadProfileForm, updateUserProfile} from "../profile/actions";

export const login = (email, password) => async (dispatch, getState) => {
  try {
    const {data} = await api.post('/login', {
      email,
      password,
    });

    const tokenData = {
      token: data.access_token,
      refreshToken: data.refresh_token,
      user: data.user,
    };

    // add token to local session storage
    SessionStorage.setItem('session', tokenData);
    await dispatch(addSessionToken(tokenData));
    await dispatch(updateUserProfile(tokenData.user));
    await dispatch(loadProfileForm(tokenData.user));
    await dispatch(sendMessage('You have been logged successfully!'));
    window.webViewBridge.send('onLogin', tokenData, function (res) {
      console.log("===Success Send Login Data to app!!! ===: ", res);
    }, function (err) {
      console.error("===Error Send Login Data to app!!! ===: ", err);
    });
  } catch (error) {
    await dispatch(sendMessage(error.message, true));
  }
};

export const resetPassword = (email, password) => async (dispatch, getState) => {
  try {
    const {data} = await api.post('/password/reset', {
      email,
    });
    if (data.id) {
      await dispatch(sendMessage('Password succesfully sent!'));
    }
  } catch (error) {
    await dispatch(sendMessage(error.message, true));
  }
};

export const autoLogin = () => {
  const session = SessionStorage.getItem('session');
  const checkSessionTokenExits = R.pathOr(false, ['token'], session);
  const user = R.pathOr({}, ['user'], session);

  return async (dispatch) => {
    if (checkSessionTokenExits) {
      await dispatch(addSessionToken(session));
      await dispatch(updateUserProfile(user));
      await dispatch(loadProfileForm(user));
    }
  };
};

export const autoLoginBy = email => {
  const session = SessionStorage.getItem('session');
  const checkSessionTokenExits = R.pathOr(false, ['token'], session);
  const user = R.pathOr({}, ['user'], session);

  return async (dispatch, getState) => {
    if (checkSessionTokenExits) {

      try {
        const adminAccessToken = getState().auth.session.token;
        const adminUser = getState().auth.session.user;
        const {data} = await api.post('/v1/autologin', {
          email,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': checkSessionTokenExits,
          },
        });

        const tokenData = {
          adminAccessToken,
          adminUser,
          token: data.access_token,
          user: data.user,
        };

        // add token to local session storage
        SessionStorage.setItem('session', tokenData);
        await dispatch(addSessionToken(tokenData));
        await dispatch(updateUserProfile(tokenData.user));
        await dispatch(loadProfileForm(tokenData.user));
        await dispatch(sendMessage('You have been logged successfully!'));
        window.location.reload();
      } catch (error) {
        await dispatch(sendMessage(error.message, true));
      }
    }
  };
};
export const loginToAdmin = () => {
  const session = SessionStorage.getItem('session');
  const checkSessionTokenExits = R.pathOr(false, ['token'], session);

  return async (dispatch, getState) => {
    if (checkSessionTokenExits) {

      try {
        const adminAccessToken = getState().auth.session.adminAccessToken;
        const adminUser = getState().auth.session.adminUser;
        const tokenData = {
          token: adminAccessToken,
          user: adminUser,
        };

        // add token to local session storage
        SessionStorage.setItem('session', tokenData);
        await dispatch(addSessionToken(tokenData));
        await dispatch(updateUserProfile(tokenData.user));
        await dispatch(loadProfileForm(tokenData.user));
        await dispatch(sendMessage('You have been logged successfully!'));
        window.location = '/';
      } catch (error) {
        await dispatch(sendMessage(error.message, true));
      }
    }
  };
};

export const logout = () => {
  SessionStorage.removeItem('session');
  if (window.webViewBridge !== undefined) {
    window.webViewBridge.send('onLogout', '', function (res) {
      console.log("===Success Logout to app!!! ===: ", res);
    }, function (err) {
      console.error("===Error Logout to app!!! ===: ", err);
    });
  }
  return (dispatch) => {
    dispatch(removeSessionToken());
  };
};
