import { connect } from 'react-redux';
import * as thunks from './thunks';
import * as actions from './actions';

const mapStateToProps = state => ({
  form: state.forms.automationReply.form,
  show: state.forms.automationReply.form.show,
  required: state.forms.automationReply.required,
});

const mapDispatcherToState = dispatch => ({
  loadAutomationReplyForm: action => dispatch(actions.loadAutomationAction(action)),
  loadForm: action => dispatch(actions.loadAutomationAction(action)),
  changeForm: action => dispatch(actions.changeAutomationAction(action)),
  saveForm: action => dispatch(thunks.saveAutomationAction(action)),
  deleteRecord: form => dispatch(thunks.deleteRecord(form)),
});

export default connect(mapStateToProps, mapDispatcherToState);
