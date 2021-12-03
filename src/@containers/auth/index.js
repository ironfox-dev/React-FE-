import { connect } from 'react-redux';
import * as thunks from './thunks';
import {Auth} from "@services";

const mapStateToProps = state => ({
  isAuthorised: state.auth.session.isAuthorised || Auth.isAuthorised(),
  token: state.auth.session.token,
  adminAccessToken: state.auth.session.adminAccessToken,
});

const mapActionsToProps = dispatch => ({
  autoLogin: () => dispatch(thunks.autoLogin()),
  autoLoginBy: email => dispatch(thunks.autoLoginBy(email)),
  loginToAdmin: () => dispatch(thunks.loginToAdmin()),
  login: (email, password) => dispatch(thunks.login(email, password)),
  resetPassword: email => dispatch(thunks.resetPassword(email)),
  logout: () => dispatch(thunks.logout()),
});

export default connect(mapStateToProps, mapActionsToProps);
