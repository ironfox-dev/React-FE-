import React, {Component} from 'react';
import LeadModal from '../@common/modals/lead';
import {compose} from 'recompose';
import {
  Segment,
  Button,
  Header,
  Input,
  Grid,
  Menu,
  Tab,
} from 'semantic-ui-react';
import './index.scss';
import {
  BreadCrumbContainer,
  DealsContainer,
  CompaniesContainer,
  LeadsContainer,
  LeadFormContainer
} from '@containers';
import LeadNotesPreview from './lead-notes-preview';
import LeadsTable from './Leads'

class Leads extends Component {
  state = {
    previewLeadId: null,
    companyId: null,
    showDeleted: false,
    activeIndex: 0,
  }

  onShowArch = (e, tab) => {
    if (tab.activeIndex === this.state.activeIndex) {
      return;
    }

    this.setState({
      activeIndex: tab.activeIndex,
    });

    this.props.toggleShowDeleted();
  };

  onCompanyChange = (companyId) => {
    this.setState({
      companyId,
    })
  }

  onPreviewLeadChange = (lead) => {
    this.setState({
      previewLeadId: lead.id,
      companyId: lead.company_id
    })
  }

  onLeadLeaveDisplayNotes = () => {
    this.setState({
      previewLeadId: null,
    })
  }

  render() {
    const { query } = this.props;
    const {
      companyId,
      previewLeadId,
    } = this.state;

    const tabs = [
      {
        menuItem: 'Active',
        render: () => <LeadsTable onPreviewLeadChange={this.onPreviewLeadChange} />
      },
      {
        menuItem: 'Archived',
        render: () => <LeadsTable onPreviewLeadChange={this.onPreviewLeadChange} />
      }
    ];

    return (
      <div className={previewLeadId ? 'Leads sidebarOpened' : 'Leads'}>
        <div className="leads-container">
          <Segment attached='top'>
            <Grid columns={2}>
              <Grid.Column>
                <Header floated='left' as='h1'>Leads</Header>
              </Grid.Column>
              <Grid.Column>
                <Menu secondary>
                  <Menu.Menu position='right'>
                    <Menu.Item>
                      <Input icon='search' onChange={this.onSearch} value={query.search} placeholder='Search...'/>
                    </Menu.Item>
                      <Button color='teal' className="new-campaign" onClick={this.props.loadForm.bind(this, {show: true})} ><i className="flaticon stroke plus-1  icon"></i></Button>
                  </Menu.Menu>
                </Menu>
              </Grid.Column>
            </Grid>
          </Segment>
          <Tab onTabChange={this.onShowArch} menu={{ secondary: true, pointing: true }} panes={tabs} />
        </div>
        <LeadModal size='small'/>
        {
          previewLeadId && <LeadNotesPreview leadId={previewLeadId} companyId={companyId} onClose={this.onLeadLeaveDisplayNotes} />
        }
      </div>);
  }
}

export default compose(BreadCrumbContainer, DealsContainer, CompaniesContainer, LeadsContainer, LeadFormContainer)(Leads);
