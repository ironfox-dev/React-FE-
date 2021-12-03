import { connect } from 'react-redux';
import * as thunks from './thunks';
import * as actions from './actions';

const mapStateToProps = state => ({
  form: state.forms.reminder.form,
  show: state.forms.reminder.form.show,
  required: state.forms.reminder.required,
});

const mapDispatcherToState = dispatch => ({
  loadForm: reminder => dispatch(actions.loadReminder(reminder)),
  changeForm: reminder => dispatch(actions.changeReminder(reminder)),
  saveForm: reminder => dispatch(thunks.saveReminder(reminder)),
  deleteForm: reminder => dispatch(thunks.deleteReminder(reminder)),
});

export default connect(mapStateToProps, mapDispatcherToState);
