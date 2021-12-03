import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {compose} from 'recompose';
import './index.scss';
import {
  AgentsContainer,
  BreadCrumbContainer,
  CampaignFormContainer,
  CampaignsContainer,
  OptinFormIntegrationContainer,
  ProfileContainer,
  MessagesContainer,
} from "@containers";
import Loader from '../loader';
import {
  Segment, Confirm, Checkbox, Header, Menu, Form,
  Grid, Button, Table, Icon, Pagination, Tab
} from 'semantic-ui-react';
import * as R from "ramda";
import CampaignModal from 'components/@common/modals/campaign';
import ModalOptinFormIntegration from 'components/@common/modals/integrations/optinform';
import ZapierIntegrationModal from "../@common/modals/integrations/zapier";
import InstapageIntegrationModal from "../@common/modals/integrations/instapage";
import ClickFunnelsIntegrationModal from "../@common/modals/integrations/clickfunnels";
import UnbounceIntegrationModal from "../@common/modals/integrations/unbounce";
import WebhookIntegrationModal from "../@common/modals/integrations/webhook";
import FacebookIntegrationModal from "../@common/modals/integrations/facebook";
import {Auth, config, Facebook} from "@services";
import ButtonGroup from "components/@common/button-group";
import {disableAutoComplete} from '../../utils';
import CampaignsModal from "./campaigns-modal";
class Campaigns extends Component {
  state = {
    open: false,
    openApiIntegration: false,
    openWebhookIntegration: false,
    openInstapageIntegration: false,
    openUnbounceIntegration: false,
    openClickFunnelsIntegration: false,
    openFBIntegration: false,
    campaignId: '',
    campaign: null,
    campaignLink: '',
    fbPages: [],
    companyId: '',
    dealId: '',
    fbIntegrations: [],
    lead_statics:{
      total_leads: 0,
      conversion_leads: 0,
      contacted_leads: 0,
      missed_leads: 0,
    },
    openOverall: true

  };

  constructor(props) {
    super(props);
    const {companyId, dealId, agentId} = props.match.params;
    if (agentId) {
      props.loadAgentCampaigns(agentId);
    } else {
      props.loadDealCampaigns(companyId, dealId);
    }
  }

  componentWillMount() {
    const {companyId, agentId, dealId} = this.props.match.params;
    this.setState({
      companyId: +companyId || (Auth.isCompany ? this.props.profile.id : null),
      agentId: +agentId,
      dealId: +dealId,
    });
  }

  componentDidMount() {
    const deal = R.pathOr({
      name: 'Deal',
      company: {
        name: 'Company',
      }
    }, ['history', 'location', 'state', 'deal'], this.props);

    if (this.state.companyId) {
      this.props.addBreadCrumb({
        name: deal.name,
        path: '/dashboard',
      });
    }

    if (this.state.companyId && Auth.isAgency) {
      this.props.addBreadCrumb({
        name: deal.company.name,
        path: `/companies/${this.state.companyId}/profile`,
      });
    }

    if (this.state.companyId) {
      this.props.addBreadCrumb({
        name: 'Campaigns',
        path: '/',
        active: true,
      }, false);
    }


    if (this.state.agentId) {
      const agentName = R.pathOr('Agent', ['location', 'state', 'agent', 'name'], this.props);
      this.props.addBreadCrumb({
        name: 'Agents',
        path: `/agents`,
      });

      this.props.addBreadCrumb({
        name: agentName,
        path: `/agents/${this.state.agentId}/profile`,
      }, false);

      this.props.addBreadCrumb({
        name: 'Campaigns',
        path: '',
      }, false);
    }

    // this.setState({
    //   ...this.state,
    //   lead_statics:{
    //     total_leads: 0,
    //     conversion_leads: 0,
    //     contacted_leads: 0,
    //     missed_leads: 0,
    //   }      
    // });
    disableAutoComplete();
  }

  getSort = field => {
    const fieldStatus = R.path(['query', 'sort', field], this.props);
    if (fieldStatus === true) {
      return 'sort amount down';
    }
    if (fieldStatus === false) {
      return 'sort amount up';
    }
    return 'sort';
  };

  openConfirmModal = (open = true, campaignId = '') => {
    this.setState({open, campaignId})
  };

  onConfirm = () => {
    this.setState({open: false});
    const {companyId, dealId} = this.props.match.params;
    this.props.deleteCampaign(companyId, dealId, this.state.campaignId);
  };

  onShowArch = () => {
    this.setState({
      openOverall: true,
      lead_statics:{
        total_leads: 0,
        conversion_leads: 0,
        contacted_leads: 0,
        missed_leads: 0,
      },   
    })    
    this.props.toggleShowDeletedCampaigns();

  };

  gotoPage = (event, data) => {
    this.props.gotoPage(data.activePage);
  };

  loadIntegrationForm = async campaign => {
    if (campaign.integration === 'OPTIN_FORM') {
      this.props.loadOptinForm({
        ...campaign,
        companyId: campaign.company_id,
        dealId: campaign.deal_id,
        show: true
      })
    }

    const copyLink = `${config.get('REACT_APP_API_SERVER')}/v1/campaigns/${campaign.uuid}/leads`;

    if (campaign.integration === 'ZAPIER') {
      this.setState({
        campaignLink: copyLink,
        openApiIntegration: true,
      });
    }

    if (campaign.integration === 'WEBHOOK') {
      this.setState({
        campaignLink: copyLink,
        openWebhookIntegration: true,
      });
    }

    if (campaign.integration === 'UNBOUNCE') {
      this.setState({
        campaignLink: copyLink,
        openUnbounceIntegration: true,
      });
    }

    if (campaign.integration === 'INSTAPAGE') {
      this.setState({
        campaignLink: copyLink,
        openInstapageIntegration: true,
      });
    }

    if (campaign.integration === 'CLICKFUNNELS') {
      this.setState({
        campaignLink: copyLink,
        openClickFunnelsIntegration: true,
      });
    }

    if (campaign.integration === 'FACEBOOK') {
      await this.checkLoginState();
      this.setState({
        campaign,
        fbIntegrations: campaign.fbIntegrations,
      });
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.campaigns && this.props.campaigns.length) {
      const campaign = this.props.campaigns.find(camp => camp.id == R.path(['campaign', 'id'], prevState));
      if (campaign && campaign.fbIntegrations && prevState.fbIntegrations &&
        (campaign.fbIntegrations.length !== prevState.fbIntegrations.length))
      this.setState({
        fbIntegrations: campaign.fbIntegrations,
      });      
    }
  }

  statusChangeCallback = (response)  => {
    if (response.status === 'connected') {
      this.retrieveAccountFacebookPages();
    } else {
      window.FB.login((response) => {
        if (response.status === 'connected') {
          this.retrieveAccountFacebookPages();
          return;
        }
        this.props.sendMessage('Was not possible to login!', true);
      }, {
        scope: [
          'manage_pages',
          'business_management',
          'ads_management',
          'leads_retrieval',
        ],
      });
    }
  };

  async retrieveAccountFacebookPages() {
    try {
      const fbPages = await Facebook.getAccountPages();

      this.setState({
        openFBIntegration: true,
        fbPages: fbPages.map(
          page => ({ key: page.name, text: page.name, value: page })),
      });
    } catch (e) {
      this.props.sendMessage('Was not possible to retrieve facebook data!', true);
    }
  }

  checkLoginState = async (campaignId) => {
    const isLoggedIn = await Facebook.checkIsLoggedIn();
    if (isLoggedIn) {
      await this.retrieveAccountFacebookPages();
    } else {
      this.props.sendMessage('Was not possible to login!', true);
    }
  };

  onCloseApiIntegration = () => {
    this.setState({
      openApiIntegration: false,
      openFBIntegration: false,
      openInstapageIntegration: false,
      openWebhookIntegration: false,
      openUnbounceIntegration: false,
      openClickFunnelsIntegration: false,
    });
  };

  onCloseCampaigns = () => {
    this.setState({
      openOverall: false,
      lead_statics:{
        total_leads: 0,
        conversion_leads: 0,
        contacted_leads: 0,
        missed_leads: 0,
      },      
    });
  }

  onOpenCampaigns = () => {
    this.setState({
      openOverall: true,
      lead_statics:{
        total_leads: 0,
        conversion_leads: 0,
        contacted_leads: 0,
        missed_leads: 0,
      },   
    })    
  }

  render() {
    const company_name = this.props.location.state.deal.name;
    const {campaigns, pagination} = this.props;
    const { 
      dealId,
      lead_statics,
      openOverall
    } = this.state;
    const tabs = [
      {
        menuItem: 'Active',
        render: () => <></>
      },
      {
        menuItem: 'Archived',
        render: () => <></>
      }
    ];    
    return (
      <div className={openOverall ? 'Campaigns sidebarOpened':'Campaigns'}>
        <Segment attached='top'>

          <ZapierIntegrationModal open={this.state.openApiIntegration}
                                  onClose={this.onCloseApiIntegration}
                                  campaignLink={this.state.campaignLink}
          />

          <InstapageIntegrationModal open={this.state.openInstapageIntegration}
                                     onClose={this.onCloseApiIntegration}
                                     campaignLink={this.state.campaignLink}
          />

          <WebhookIntegrationModal open={this.state.openWebhookIntegration}
                                     onClose={this.onCloseApiIntegration}
                                     campaignLink={this.state.campaignLink}
          />

          <UnbounceIntegrationModal open={this.state.openUnbounceIntegration}
                                     onClose={this.onCloseApiIntegration}
                                     campaignLink={this.state.campaignLink}
          />

          <ClickFunnelsIntegrationModal open={this.state.openClickFunnelsIntegration}
                                     onClose={this.onCloseApiIntegration}
                                     campaignLink={this.state.campaignLink}
          />

          <FacebookIntegrationModal open={this.state.openFBIntegration}
                                    onClose={this.onCloseApiIntegration}
                                    fbPages={this.state.fbPages}
                                    campaign={this.state.campaign}
                                    fbIntegrations={this.state.fbIntegrations}
                                    subscribe={this.props.subscribeCampaignToFbIntegration}
                                    unsubscribe={this.props.unsubscribeCampaignToFbIntegration}
          />
          <ModalOptinFormIntegration/>

          <CampaignModal
            companyId={this.state.companyId}
            dealId={this.state.dealId}
            agentId={this.state.agentId}/>

          <Confirm open={this.state.open} 
                   onCancel={this.openConfirmModal.bind(this, false)}
                   onConfirm={this.onConfirm}/>

            <div className="top note">
                When you change a campaign's company, your integrations will stop running until you assign them a new agent. <a className="item" href="https://convertlead.com/docs-home/" target="_blank">Learn more</a>
            </div>

            <Grid columns={2}>
            <Grid.Column>
                <Header floated='left' as='h1'>Integrations</Header>
                <br />
                <span className="subhead company">{company_name}</span>
            </Grid.Column>

            <Grid.Column>
              <Menu secondary>
                <Menu.Menu position='right'>
                  <Link to={`/deals/${dealId}/automations`} >
                    <Button color='teal' content='Automations' labelPosition='left'/>
                  </Link>
                  <Button 
                    color='teal' 
                    className="new-campaign" 
                    onClick={this.props.loadForm.bind(this, {
                    agentId: this.state.agentId,
                    show: true})} content='New Company'>
                    <i className="flaticon stroke plus-1  icon"></i>
                  </Button>                            
                </Menu.Menu>
              </Menu>
            </Grid.Column>
          </Grid>
        </Segment>

        <Tab onTabChange={this.onShowArch} menu={{ secondary: true, pointing: true }} panes={tabs} />

        <Segment basic>
            <Loader/>
            <Table>
              { campaigns.length == 0 && (
               <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    <div className="table-head blue" style={{width: '87px'}}>
                      Name
                    </div>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <div className="table-head blue" style={{width: '87px'}}>
                      Leads 
                    </div>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <div className="table-head blue" style={{width: '87px'}}>
                      Assigned to
                    </div>  
                  </Table.HeaderCell>
                  <Table.HeaderCell> 
                    <div className='table-head yellow' style={{width: '123px'}}>
                      RESPONSE TIME
                    </div>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <div className="table-head blue" style={{width: '87px'}}>
                      integration
                    </div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              )
              }

              <Table.Body>
                {       
                  campaigns.length != 0 && campaigns.map((campaign, index) => (
                    lead_statics.total_leads      = lead_statics.total_leads + campaign.leads_count_all,
                    lead_statics.conversion_leads = lead_statics.conversion_leads + campaign.leads_count_s,
                    lead_statics.contacted_leads  = lead_statics.contacted_leads + campaign.leads_count_c,
                    lead_statics.missed_leads     = lead_statics.missed_leads + campaign.leads_count_m,
                    
                    <Table.Row key={index} onClick = {this.onOpenCampaigns}>
                      <Table.Cell>
                        {
                          campaign.integration === 'FACEBOOK'
                            ? <Button circular className='facebookbut' icon='facebook'/>
                            : null
                        }
                        {
                          campaign.integration === 'ZAPIER'
                            ? <Button circular className='icon zapierbut'
                          ><i className="icon-zapier"></i></Button>
                            : null
                        }
                        {
                          campaign.integration === 'CLICKFUNNELS'
                            ? <Button circular className='clickfunnelsbut'
                                      icon='icon-clickfunnels'>

                            </Button>
                            : null
                        }
                        {
                          campaign.integration === 'WEBHOOK'
                            ? <Button circular className='webhookbut'
                                      icon='icon-webhook'/>
                            : null
                        }
                        {
                          campaign.integration === 'INSTAPAGE'
                            ? <Button circular className='instapagebut'
                                      icon='icon-instapage'/>
                            : null
                        }
                        {
                          campaign.integration === 'UNBOUNCE'
                            ? <Button circular className='unbouncedbut'
                                      icon='icon-unbounce'/>
                            : null
                        }
                        {
                          campaign.integration === 'OPTIN_FORM'
                            ? <Button circular color='purple' icon='file alternate outline'/>
                            : null
                        }
                      </Table.Cell>
                      <Table.Cell>
                        <div className="campain-name">
                          {campaign.name}
                        </div>
                        <div className="integration-name">
                          {campaign.integration}
                        </div>
                      </Table.Cell>

                      <Table.Cell>
                        <div className="table-head blue" style={{width: '87px'}}>
                          TOTAL LEADS
                        </div>
                        <div className="table-cell-value">
                          <Link to={`/companies/${campaign.company.id}/campaigns/${campaign.id}/leads`}>
                            {campaign.leads_count_all || 0}
                          </Link>
                        </div>
                      </Table.Cell>

                      <Table.Cell> 
                        {
                            campaign.agents.length != 0 && (
                                <div className='table-head blue' style={{width: '87px'}}>ASSIGNED TO</div>
                            )
                        }
                        <div className="assignedName">
                        {
                            campaign.agents.length != 0 && 
                            campaign.agents.map(
                              (agent, key) =>

                                <div key={key}>
                                    <div className="table-cell-value">
                                    {   
                                        agent.name !='' && (
                                            <Link to={`/agents/${agent.id}/profile`}>{agent.name}</Link>
                                        )  
                                    } ,   
                                    </div>
                                </div>
                            ) || (
                                <div className="table-cell-value">
                                    <span className="NoAgentName"> NO AGENT ASSIGNED </span>  
                                </div>
                            )
                        } 
                        </div>                       
                      </Table.Cell>
                      {
                        this.state.agentId && Auth.isAgency ? <Table.Cell>
                          <Link
                            to={`/companies/${campaign.company.id}/profile`}>{campaign.company.name}</Link>
                        </Table.Cell> : null
                      }
                      <Table.Cell>
                        <div className='table-head yellow' style={{width: '100px'}}>
                          RESPONSE TIME
                        </div>
                        <div className="table-cell-value">
                          {/* {campaign.avg_time_response || 0} */}
                          {campaign.avg_min_response || 0} min
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        
                            <div className="action-button">
                            <Button
                              className={"integration-but"}
                              onClick={this.loadIntegrationForm.bind(this, campaign)}>
                              Integration
                            </Button>
                            <ButtonGroup>
                              <Button onClick={this.props.loadForm.bind(this, {
                                ...campaign,
                                companyId: campaign.company_id,
                                dealId: campaign.deal_id,
                                agentId: this.state.agentId,
                                agents: campaign.agents && campaign.agents.map(agent => agent.id),
                                show: true
                              })}>
                                Edit
                              </Button>
                              <Button
                                onClick={this.openConfirmModal.bind(this, true, campaign.id)}>
                                Archive
                              </Button>
                            </ButtonGroup>
                          </div>
                          {
                            // !campaign.deleted_at ?
                            // (<div className="action-button">
                            //   <Button
                            //     className={"integration-but"}
                            //     onClick={this.loadIntegrationForm.bind(this, campaign)}>
                            //     Integration
                            //   </Button>
                            //   <ButtonGroup>
                            //     <Button onClick={this.props.loadForm.bind(this, {
                            //       ...campaign,
                            //       companyId: campaign.company_id,
                            //       dealId: campaign.deal_id,
                            //       agentId: this.state.agentId,
                            //       agents: campaign.agents && campaign.agents.map(agent => agent.id),
                            //       show: true
                            //     })}>
                            //       Edit
                            //     </Button>
                            //     <Button
                            //       onClick={this.openConfirmModal.bind(this, true, campaign.id)}>
                            //       Archive
                            //     </Button>
                            //   </ButtonGroup>
                            // </div>)
                            // : null
                          }
                      </Table.Cell>
                    </Table.Row>
                  ))
                }

              </Table.Body>
            </Table>
          </Segment>

        <Segment textAlign='right' attached='bottom'>
          <Pagination onPageChange={this.gotoPage}
                      defaultActivePage={pagination.current_page}
                      prevItem={null}
                      nextItem={null}
                      totalPages={pagination.last_page}/>
        </Segment>
        {/* { companyStats && companyStats.id && (<CompanyLeadStats companyObject={companyStats} onClose={this.onCloseCompanyStats} />) }                 */}
        {campaigns.length!=0 && openOverall && (<CampaignsModal lead_statics={lead_statics}  onClose = {this.onCloseCampaigns} />)} 
      </div>
    );
  }
}

export default compose(OptinFormIntegrationContainer, MessagesContainer, ProfileContainer, AgentsContainer, CampaignsContainer, CampaignFormContainer, BreadCrumbContainer)(Campaigns);
