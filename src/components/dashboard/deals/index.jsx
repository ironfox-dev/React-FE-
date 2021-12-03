import React, { Component } from 'react';
import { compose } from 'recompose';
import { CompaniesContainer, DealsContainer} from '@containers';
import DealModal from 'components/@common/modals/deal';
import Loader from 'components/loader';
import {
  Segment,
  Message,
  Confirm,
  Header,
  Menu,
  Input,
  Grid,
  Button,
  Form,
  Select,
  Tab
} from 'semantic-ui-react';
import Cookies from 'js-cookie';

import './index.scss';
import { DealFormContainer } from "@containers";
import * as R from "ramda";
import {Auth} from "@services";
import {disableAutoComplete} from '../../../utils';
import { DealsComponent } from './DealsComponent';
import DealsStatistics from "./DealsStatistics";

const companies = [
  {key: null, text: 'All companies', value: null},
];

class Dashboard extends Component {
  state = {
    open: false,
    companyId: '',
    dealId: '',
    showArchived: false,
    visible: 1,
    dealIds: [],
  };

  componentWillMount() {
    const companyId = +R.pathOr('', ['companyId'], this.props);
    this.props.getCompanyDeals();

    this.props.filterDealsByDealId(null);
    this.props.filterDealCampaignsById(null);

    if (Auth.isAgency) {
      this.props.loadSelectBoxCompanies();
      this.props.filterDealsByCompany(companyId);
      this.setState({
        companyId,
      });
    }
  }

  openConfirmModal = (open = true, companyId = '', dealId = '') => {
    this.setState({open, companyId, dealId});
  };

  onConfirm = () => {
    this.setState({open: false});
    this.props.deleteDeal(this.state.companyId, this.state.dealId);
  };


  searchDealsByCompany = (event, data) => {
    this.props.searchDealCompaniesBy(data.value);
  };

  filterDealsByCompany = (event, data) => {
    this.props.filterDealsByCompany(data.value);
  };

  sortBy = (event, data) => {
    this.props.sortBy(data.value);
  };

  onSearchChange = event => {
    this.props.loadSelectBoxCompanies(event.target.value);
  };

  onShowArch = () => {
    this.state.showArchived = !this.state.showArchived;
    this.setState(this.state);
  };

  handleDismiss = () => {
    Cookies.set('welcome_popup', 0);
    this.setState(() => ({ visible: 0 }));
  };

  componentDidMount() {
    disableAutoComplete();
    this.setState(() => ({
      visible: Cookies.get('welcome_popup') !== undefined ? Number(Cookies.get('welcome_popup')) : true,
    }));
  }

  onDealSelected(deal) {
    let dealIds = this.state.dealIds;
    if (deal.checked) {
       dealIds.push(deal.value);
    } else {
      dealIds = dealIds.filter((id) => id !== deal.value);
    }

    this.setState({
      dealIds,
    });
  }
  onClose() {
    this.setState({
      dealIds: [],
    })
  }

  render() {
    const { deals, deleted_deals, filters } = this.props;
    const { companyId, visible, dealIds, reset } = this.state;
    const sorByFiled = [
      {
        key: 'name.desc',
        value: 'name.desc',
        text: 'Name Descending',
      },
      {
        key: 'name.asc',
        value: 'name.asc',
        text: 'Name Ascending',
      },
      {
        key: 'created_at.desc',
        value: 'created_at.desc',
        text: 'Date Descending',
      },
      {
        key: 'created_at.asc',
        value: 'created_at.asc',
        text: 'Date Ascending',
      }
    ]

    const Filters = () => (
      <div className="campaignFilters">
        <div className="filterByCompany filter white">
          {
            Auth.isAgency ?
              <Form.Field
                control={Select}
                options={[...companies, ...this.props.selectBoxCompanies]}
                placeholder='All companies'
                search
                onChange={this.filterDealsByCompany}
                defaultValue={companyId || null}
                onSearchChange={this.onSearchChange}
                searchInput={{id: 'form-companies-list'}}
              />
              : null
          }
        </div>
        <div className="campaign-sort">
          <Form.Field
            control={Select}
            options={sorByFiled}
            label={{children: 'Sort by', htmlFor: 'campaign-sort-by'}}
            placeholder='Sort by '
            search
            onChange={this.sortBy}
            defaultValue={this.props.filters.sortBy}
            onSearchChange={this.sortBy}
            searchInput={{id: 'campaign-sort-by'}}
          />
        </div>
      </div>
    );

    const panes = [
      {
        menuItem: 'Active',
        render: () => (
          <Tab.Pane attached={false}>
            <Filters />
            <DealsComponent
              onDealSelected={this.onDealSelected.bind(this)}
              deals={deals}
              dealIds={dealIds}
              loadForm={this.props.loadForm}
              openConfirmModal={this.openConfirmModal}
              key={`deals-live-${JSON.stringify(dealIds)}`}
            />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Archived',
        render: () => (
          <Tab.Pane attached={false}>
            <Filters />
            <DealsComponent
              onDealSelected={this.onDealSelected.bind(this)}
              deleted
              dealIds={dealIds}
              deals={deleted_deals}
              key={`deals-archived-${JSON.stringify(dealIds)}`}
            />
          </Tab.Pane>
        ),
      },
    ];

    return (
      <div className={'Dashboard ' + (dealIds.length ? 'sidebarOpened' : '')}>
        {
          dealIds.length > 0 && (
              <DealsStatistics
                dealIds={dealIds}
                onClose={() => this.onClose()}
                key={JSON.stringify(dealIds)}
              />
            )
        }
        {
          !visible || <Message className='dash' onDismiss={this.handleDismiss}>
              <Message.Header>
                Need Help?
              </Message.Header>
              <Message.Content>
                <p>Click the button below to watch our video tutorials.</p>
                <a className="item" href="https://convertlead.com/docs-home/" target="_blank">Take me there</a>
              </Message.Content>
            </Message>
        }
        <DealModal/>
        <Confirm open={this.state.open} onCancel={this.openConfirmModal.bind(this, false)}
                 onConfirm={this.onConfirm}/>
        <Segment attached='top'>
            <Grid columns={2}>
            <Grid.Column>

              <Header floated='left' as='h1'>Campaigns</Header>
            </Grid.Column>
            <Grid.Column>
              <Menu secondary>
                <Menu.Menu position='right'>
                  <Menu.Item>
                    <Input icon='flaticon stroke zoom-2' onChange={this.searchDealsByCompany} value={filters.search}
                           placeholder='Search...'/>
                  </Menu.Item>
                  <Button color='teal'
                          content=''
                          icon='flaticon stroke plus-1 '
                          className="new-campaign"
                          onClick={this.props.loadForm.bind(this, {show: true})}/>
                </Menu.Menu>
              </Menu>
            </Grid.Column>
          </Grid>
          <Segment basic>

            <Loader/>
            <Tab onTabChange={() => (this.setState({ dealIds: [] }))} menu={{ secondary: true, pointing: true }} panes={panes} />
          </Segment>
        </Segment>
      </div>

    );
  }
}

export default compose(CompaniesContainer, DealsContainer, DealFormContainer)(Dashboard);
