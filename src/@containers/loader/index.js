import { connect } from 'react-redux';
import * as actions from './actions';

const mapStateToProps = state => ({
  loadReady: state.loader.ready,
});

const mapDispatcherToProps = dispatch => ({
  showLoader: () => dispatch(actions.showLoader()),
  hideLoader: () => dispatch(actions.hideLoader()),
});

export default connect(
  mapStateToProps,
  mapDispatcherToProps,
);
