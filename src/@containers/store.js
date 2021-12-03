import { createStore, applyMiddleware } from 'redux';
import { compose } from 'recompose';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { axiosMiddelware } from '../middlewares';

const store = createStore(
  reducers,
  compose(applyMiddleware(axiosMiddelware, thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : noop => noop,
  ),
);

export default store;
