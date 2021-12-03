import {connect} from 'react-redux';
import * as thunks from './thunks';
import * as actions from './actions';
import {
    getDeals,
    getDeletedDeals,
    getSelectBoxDealCampaigns,
    getSelectBoxDealCampaignAgents,
    getSelectBoxDeals, getGraphicStatistics, getSelectedGraphicCStatistics,
} from './selectors';

const mapStateToProps = state => ({
    deals: getDeals(state),
    deleted_deals: getDeletedDeals(state),
    filters: state.deals.filters,
    selectBoxDeals: getSelectBoxDeals(state),
    selectBoxDealCampaigns: getSelectBoxDealCampaigns(state),
    selectBoxDealCampaignAgents: getSelectBoxDealCampaignAgents(state),
    dealsStatistics: state.deals.dealsStatistics,
    dealsGraphic: getGraphicStatistics(state.deals),
    dealsSelectedGraphicStatistics: getSelectedGraphicCStatistics(state.deals),
});

const mapDispatchToProps = dispatch => ({
    getCompanyDeals: () => dispatch(thunks.getCompanyDeals()),
    deleteDeal: (companyId, id) => dispatch(thunks.deleteDeal(companyId, id)),
    filterDealsByCompany: id => dispatch(actions.filterDealsByCompany(id)),
    filterDealsByDealId: id => dispatch(actions.filterDealsById(id)),
    filterDealCampaignsById: id => dispatch(actions.filterDealCampaignsById(id)),
    searchDealCompaniesBy: search => dispatch(actions.searchDealCompaniesBy(search)),
    sortBy: (key) => dispatch(actions.sortBy(key)),
    fetchDealsStatistics: (dealIds, fromDate, toDate) => dispatch(thunks.fetchDealsStatistics(dealIds, fromDate, toDate)),
    dealDisplayGraphicDate: (date) => dispatch(actions.dealDisplayGraphicDate(date)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
);
