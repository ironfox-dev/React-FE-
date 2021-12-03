import { connect } from 'react-redux';
import * as thunks from './thunks';
import * as actions from './actions';

const mapStateToProps = state => ({
  form: state.forms.agent.form,
  show: state.forms.agent.form.show,
  required: state.forms.agent.required,
});

const mapDispatcherToState = dispatch => ({
  loadForm: agent => dispatch(actions.loadAgent(agent)),
  changeForm: agent => dispatch(actions.changeAgent(agent)),
  saveForm: agent => dispatch(thunks.saveAgent(agent)),
});

export default connect(mapStateToProps, mapDispatcherToState);
