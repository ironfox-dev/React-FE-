import React from 'react';
import { compose, lifecycle } from 'recompose';
import 'react-toastify/dist/ReactToastify.css';

import { withRouter, Route, Switch } from 'react-router-dom';
import Layout from './layout';
import { AuthContainer, ProfileContainer } from '@containers';
import { LoginLayout, OptinFormPage, ResetPassword } from '.';

import './App.scss';
import './static/linearicons.css';
import './static/stroke.css';
import './static/averta.css';
import './static/style.css';
import './static/my.custom.css';
import './static/tabler-icons.css';

const App = () => (
  <div className="App">
    {
      <Switch>
        <Route exact path="/login" component={withRouter(LoginLayout)} />
        <Route exact path="/password-reset" component={withRouter(ResetPassword)} />
        <Route exact path="/campaign/:uuid" component={withRouter(OptinFormPage)} />
        <Route path="/" component={Layout} />
      </Switch>
    }
  </div>
);

export default withRouter(compose(AuthContainer, ProfileContainer, lifecycle({
  componentWillMount() {
    this.props.autoLogin();
  },
}))(App));
