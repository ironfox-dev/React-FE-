import { connect } from 'react-redux';

import { addActiveGroupButton, hideAll } from './reducer';

const mapStateToProps = state => ({
  buttonGroup: state.buttonGroup,
});

const mapActionsToState = dispatch => ({
  addActiveGroupButton: id => dispatch(addActiveGroupButton(id)),
  hideAll: () => dispatch(hideAll()),
});

export default connect(mapStateToProps, mapActionsToState);
