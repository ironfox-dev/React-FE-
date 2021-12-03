import { connect } from 'react-redux';
import * as thunks from './thunks';
import * as actions from './actions';

const mapStateToProps = state => ({
  formSaved: state.forms.lead.formSaved,
  form: state.forms.lead.form,
  show: state.forms.lead.form.show,
  required: state.forms.lead.required,
});

const mapDispatcherToState = dispatch => ({
  loadForm: lead => dispatch(actions.loadLead(lead)),
  changeForm: lead => dispatch(actions.changeLead(lead)),
  saveForm: lead => dispatch(thunks.saveLead(lead)),
});

export default connect(mapStateToProps, mapDispatcherToState);
