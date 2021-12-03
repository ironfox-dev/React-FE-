import { connect } from 'react-redux';
import { addBreadCrumb, resetBreadCrumbToDefault } from './actions';

const mapStateToProps = state => state.breadcrumb;

const mapDispatchToProps = dispatch => ({
  addBreadCrumb: (pageInfo, reset = true) => dispatch(addBreadCrumb(pageInfo, reset)),
  resetBreadCrumbToDefault: () => dispatch(resetBreadCrumbToDefault()),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
);
