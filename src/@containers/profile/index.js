import { connect } from 'react-redux';
import * as thunks from './thunks';
import * as actions from './actions';
import {getSelectBoxAgencies} from "./selectors";

const mapStateToProps = state => ({
  profile: state.profile.profile,
  selectBoxAgencies: getSelectBoxAgencies(state),
  profileForm: state.profile.profileForm,
  passwordResetForm: state.profile.passwordResetForm,
});

const mapDispatchToProps = dispatch => ({
  getUserProfile: () => dispatch(thunks.getUserProfile()),
  updateUserProfile: profile => dispatch(thunks.updateProfile(profile)),
  changeProfileForm: profile => dispatch(actions.changeProfileForm(profile)),
  changePasswordResetForm: profile => dispatch(actions.changePasswordResetForm(profile)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
);
