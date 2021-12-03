import React, {Component} from 'react';
import {compose} from 'recompose';
import { Accordion, Icon, Segment, Button, Grid, Header } from 'semantic-ui-react';
import { BreadCrumbContainer, LeadNotesContainer, LeadFormContainer, LeadsContainer } from "@containers";
import TimeLine from "./timeline";
import Loader from 'components/loader';
import './index.scss';
import LeadModal from 'components/@common/modals/lead';
import {config} from '@services';
import {Device} from "twilio-client";

class LeadNotes extends Component {
    state = {
        onPhone: false,
        readyToCall: false,
    }

    async componentWillMount() {
        const {companyId, leadId} = this.props.match.params;
        this.props.loadLead(companyId, leadId);
        this.props.addBreadCrumb({
            name: 'Leads',
            path: '/leads'
        });
        this.props.fetchTwilioTokenBy(leadId);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.twilioToken !== this.props.twilioToken && this.props.twilioToken) {
            Device.setup(this.props.twilioToken);
        }
    }


    componentDidMount() {
        Device.disconnect(() => {
            this.setState({
                onPhone: false,
            });
        });
        Device.ready(() => {
            this.setState({
                readyToCall: true,
            })
        });
    }


    onCall = () => {
        const checkIsValidNumber = /^([0-9]|#|\*)+$/.test(this.props.lead.phone.replace(/[\+\-()\s]/g,''))
        if (this.state.onPhone) {
            Device.disconnectAll();
        } else if (this.props.twilioToken && checkIsValidNumber) {
            Device.connect({ number: this.props.lead.phone });
            this.setState({
                onPhone: true,
            });
        }
    }

    onAddNote = form => {
        this.props.createLeadNote({
            ...form,
            status: form.status ? form.status : this.props.lead.status
        });
    };

    exportToPDF = (companyId, leadId) => {
        this.props.exportToPDF(companyId, leadId);
    };

    render() {
        const {lead, leadNotes, leadStatuses, twilioToken} = this.props;
        const { onPhone } = this.state;

        return (
            <div className='LeadNotes'>
                <LeadModal size='small'/>
                <Grid.Column width={6}>
                    <Segment className='lead-profile'>
                        <div className='lead-profile-row'>
                            <div className={`timeline-status timeline-bg-color-${lead.status.charAt(0).toLowerCase()}`}>
                                <span>{(lead.fullname && lead.fullname.charAt(0)) || lead.status.charAt(0)}</span>
                            </div>
                            <div className='lead-profile-value fullname'>{lead.fullname}</div>

                            <Grid.Column  style={{textAlign: 'center'}}>
                                <div className={'ui secondary menu leadnotes'}>
                                    <Button circular className='email'
                                            icon='icon-email'   as='a' href={`mailto:${lead.email}`}/>

                                    <Button circular className='editlead'
                                            icon='icon-pencil'  onClick={this.props.loadForm.bind(this, {
                                        ...lead,
                                        company_id: lead.company.id,
                                        show: true
                                    })}/>
                                    {
                                        twilioToken && <Button circular className={(onPhone ? 'endCall' : 'onCall')} icon='phone'  onClick={this.onCall} />
                                    }
                                </div>
                            </Grid.Column>

                             <div className='lead-profile-row'>
                            <div className='lead-profile-label'><label>Phone</label></div>
                            <div className='lead-profile-value'>{lead.phone}</div>
                        </div>
                        <div className='lead-profile-row'>
                            <div className='lead-profile-label'><label>Email</label></div>
                            <div className='lead-profile-value'>{lead.email}</div>
                        </div>
                         <div className='lead-profile-row'>
                            <div className='lead-profile-label'><label>Integration</label></div>
                            <div className='lead-profile-value'>{lead.campaign.name}</div>
                        </div>
                        <div className='lead-profile-row'>
                            <div className='lead-profile-label'><label>Assigned to</label></div>
                            <div className='lead-profile-value'>{lead.agent.name}</div>
                        </div>
                        <div className='lead-profile-row'>
                            <div className='lead-profile-label'><label>Company</label></div>
                            <div className='lead-profile-value'>{lead.company.name}</div>
                        </div>
                        <div className='lead-profile-row additionalinfo'>
                            <div className='lead-profile-label-additional '><label>Additional information:</label></div>

                        </div>
                            {
                                !!lead.metadata && <div className='lead-profile-row'>
                                    <p>{lead.metadata}</p>
                                </div>
                            }
                        </div>
                    </Segment>
                </Grid.Column>

                <Segment attached='top' className='pagehead'>
                    <Grid.Column floated='left' style={{textAlign: 'left'}}>
                        <Header floated='left' as='h1'>Lead timeline</Header>
                    </Grid.Column>
                </Segment>

                <Segment attached='top'>
                    <Segment basic className={"notoppad"}>
                        <Loader/>

                        <div className="export-data">Export your data
                            <a href={`${config.get('REACT_APP_API_SERVER')}/v1/leads/${lead.id}/export-csv`}>.csv export</a>
                            <a href={`${config.get('REACT_APP_API_SERVER')}/v1/leads/${lead.id}/export-pdf`}>.pdf export</a>
                        </div>

                        <Grid columns='equal'>
                            <Grid.Row>

                                <Grid.Column textAlign='left'>
                                    <Segment basic>
                                        <TimeLine notes={leadNotes} lead={lead} onAddNote={this.onAddNote}
                                                  leadStatuses={leadStatuses}/>
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </Segment>
            </div>
        )
    }
}

export default compose(BreadCrumbContainer, LeadsContainer, LeadNotesContainer, LeadFormContainer)(LeadNotes);
