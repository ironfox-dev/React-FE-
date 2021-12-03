import { connect } from 'react-redux';
import * as thunks from './thunks';
import * as actions from './actions';
import { config } from "@services";

const mapStateToProps = state => ({
  show: state.forms.optinFormIntegration.form.show,
  form: state.forms.optinFormIntegration.form,
  optinFormLink: `${config.get('REACT_APP_WEB_URI')}/campaign/${state.forms.optinFormIntegration.form.uuid}`
});

const mapDispatcherToProps = disptach => ({
  loadForm: form => disptach(actions.loadForm(form)),
  loadOptinForm: form => disptach(actions.loadForm(form)),
  changeOptinForm: (field, fieldData) => disptach(actions.changeOptinForm(field, fieldData)),
  saveForm: form => disptach(thunks.saveOptinForm(form)),
});

export default connect(mapStateToProps, mapDispatcherToProps);