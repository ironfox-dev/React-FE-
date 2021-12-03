import { connect } from 'react-redux';
import { getUserSideBarMenu } from './actions';

const mapStateToProps = state => state.menu;

const mapDispatchToProps = dispatch => ({
  getUserSideBarMenu: (role) => {
    dispatch(getUserSideBarMenu(role));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
);
