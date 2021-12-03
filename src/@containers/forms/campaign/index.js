import { connect } from 'react-redux';
import * as thunks from './thunks';
import * as actions from './actions';

const mapStateToProps = state => ({
  form: state.forms.campaign.form,
  integrationTypes: state.forms.campaign.integrationTypes,
  companyAgents: state.forms.campaign.integrationTypes,
  required: state.forms.campaign.required,
  show: state.forms.campaign.show,
});

const mapDispatcherToState = dispatch => ({
  loadForm: campaign => dispatch(actions.loadCampaign(campaign)),
  changeForm: campaign => dispatch(actions.changeCampaign(campaign)),
  saveForm: campaign => dispatch(thunks.saveCampaign(campaign)),
});

export default connect(mapStateToProps, mapDispatcherToState);
