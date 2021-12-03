import { connect } from 'react-redux';
import * as thunks from './thunks';
import * as actions from './actions';

const mapStateToProps = state => ({
  form: state.forms.company.form,
  required: state.forms.company.required,
  show: state.forms.company.form.show,
});

const mapDispatcherToState = dispatch => ({
  loadForm: company => dispatch(actions.loadCompany(company)),
  changeForm: company => dispatch(actions.changeCompany(company)),
  saveForm: company => dispatch(thunks.saveCompany(company)),
});

export default connect(mapStateToProps, mapDispatcherToState);
