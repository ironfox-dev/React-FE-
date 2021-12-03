import { connect } from 'react-redux';
import * as thunks from './thunks';
import * as actions from './actions';

const mapStateToProps = state => ({
  form: state.forms.automation.form,
  show: state.forms.automation.form.show,
  required: state.forms.automation.required,
});

const mapDispatcherToState = dispatch => ({
  loadForm: action => dispatch(actions.loadAutomationAction(action)),
  changeForm: action => dispatch(actions.changeAutomationAction(action)),
  saveForm: action => dispatch(thunks.saveAutomationAction(action)),
  deleteRecord: form => dispatch(thunks.deleteRecord(form)),
});

export default connect(mapStateToProps, mapDispatcherToState);
