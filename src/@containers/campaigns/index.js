import { connect } from 'react-redux';
import * as thunks from './thunks';
import {getDeal} from "./selectors";

const mapStateToProps = state => ({
  campaigns: state.campaigns.campaigns,
  deal: getDeal(state),
  pagination: state.campaigns.pagination,
  query: state.campaigns.query,
});

const mapDispatcheToProps = dispatch => ({
  loadDealCampaigns: (companyId, dealId) => dispatch(thunks.loadDealCampaigns(companyId, dealId)),
  loadAgentCampaigns: agentId => dispatch(thunks.loadAgentCampaigns(agentId)),
  deleteCampaign: (companyId, dealId, campaignId) => dispatch(thunks.deleteCampaign(companyId, dealId, campaignId)),
  gotoPage: page => dispatch(thunks.gotoPage(page)),
  sort: field => dispatch(thunks.sortCampaigns(field)),
  toggleShowDeletedCampaigns: () => dispatch(thunks.toggleShowDeletedCampaigns()),
  subscribeCampaignToFbIntegration: (campaignId, integration) =>
    dispatch(thunks.subscribeToFbIntegration(campaignId, integration)),
  unsubscribeCampaignToFbIntegration: (campaignId, integrationId) =>
    dispatch(thunks.unsubscribeToFbIntegration(campaignId, integrationId))
});

export default connect(mapStateToProps, mapDispatcheToProps);
