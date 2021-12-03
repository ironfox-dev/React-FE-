import { connect } from "react-redux";
import * as thunks from './thunks';
import {getActionBy, getMappedActions} from "./selectors";

const mapStateToProps = state => ({
  actions: getMappedActions(state),
  deal: state.dealActions.get('deal').toJS(),
  actionsOriginal: state.dealActions.get('actions').toJS(),
  getActionBy: actionId => getActionBy(actionId, state),
});

const mapDispatchToProps = dispatch => ({
  fetchDealActions: (dealId) => dispatch(thunks.fetchDealAction(dealId)),
  fetchDeal: (dealId) => dispatch(thunks.fetchDeal(dealId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
