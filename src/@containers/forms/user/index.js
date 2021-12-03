import { connect } from 'react-redux';
import * as thunks from './thunks';
import * as actions from './actions';

const mapStateToProps = state => ({
  form: state.forms.user.form,
  required: state.forms.user.required,
  show: state.forms.user.form.show,
});

const mapDispatcherToState = dispatch => ({
  loadForm: user => dispatch(actions.loadUser(user)),
  changeForm: user => dispatch(actions.changeUser(user)),
  saveForm: user => dispatch(thunks.saveUser(user)),
});

export default connect(mapStateToProps, mapDispatcherToState);
