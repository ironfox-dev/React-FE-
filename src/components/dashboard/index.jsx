import React, {Component} from 'react';
import {compose} from 'recompose';
import {BreadCrumbContainer} from '@containers';
import Deals from './deals';
import * as R from "ramda";
import {Auth} from "@services";
import './index.scss';
import LeadStats from "./leads-stats";
import Users from "../users";

class Dashboard extends Component {
  state = {
    open: false,
    companyId: '',
    dealId: '',
  };

  componentWillMount() {
    this.props.resetBreadCrumbToDefault();
    const companyId = +R.pathOr('', ['match', 'params', 'companyId'], this.props);
    this.setState({
      companyId,
    });
  }

  render() {
    return (
      <div className='Dashboard'>
        {
          (Auth.isAgency || Auth.isCompany)
            ? <Deals companyId={this.state.companyId}/>
            : Auth.isAdmin ? <Users/> : <LeadStats/>
        }
      </div>
    );
  }
}

export default compose(BreadCrumbContainer)(Dashboard);