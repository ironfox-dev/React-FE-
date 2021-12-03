import { connect } from 'react-redux';
import * as actions from '../../messages/actions';

const mapStateToProps = state => ({
  form: state.forms.agent.form,
  show: state.forms.agent.form.show,
  required: state.forms.agent.required,
});

const mapDispatcherToState = dispatch => ({
  formSent: agent => dispatch(actions.loadAgent(agent)),
});

export default connect(mapStateToProps, mapDispatcherToState);
