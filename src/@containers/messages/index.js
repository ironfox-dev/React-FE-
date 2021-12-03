import { connect } from 'react-redux';
import * as R from 'ramda';

import * as thunks from './thunks';


const mapStateToProps = state => ({
  error: R.pathOr(false, ['messages', 'error'], state)
});

const mapDispatcherToProps = dispatch => ({
  sendMessage: (message, error = false) => dispatch(thunks.sendMessage(message, error)),
  sendMessageInfo: message => dispatch(thunks.sendMessageInfo(message)),
  sendMessageWarn: message => dispatch(thunks.sendMessageWarn(message)),
});

export default connect(
  mapStateToProps,
  mapDispatcherToProps,
);
