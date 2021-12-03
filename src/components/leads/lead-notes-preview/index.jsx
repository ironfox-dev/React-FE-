import React, {Component} from 'react';
import {compose} from 'recompose';
import {Segment, Button, Grid, Icon, Label} from 'semantic-ui-react';
import { BreadCrumbContainer, LeadNotesContainer, LeadFormContainer, LeadsContainer } from "@containers";
import TimeLine from "./timeline";
import './index.scss';
import LeadModal from 'components/@common/modals/lead';
import {Link} from "react-router-dom";
import { Device } from 'twilio-client';

class LeadNotes extends Component {
    state = {
        onPhone: false,
        readyToCall: false,
    }
    async componentWillMount() {
        const {companyId, leadId} = this.props;
        this.props.loadLead(companyId, leadId, true, true);
        this.props.fetchTwilioTokenBy(leadId);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.leadId !== this.props.leadId) {
            const {companyId, leadId} = this.props;
            this.props.loadLead(companyId, leadId, true, true);
        }
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
            console.log('Redy to call');
            this.setState({
                readyToCall: true,
            })
        });
    }

    onAddNote = form => {
        this.props.createLeadNote({
            ...form,
            status: form.status ? form.status : this.props.lead.status
        });
    };

    onCall = () => {
        const checkIsValidNumber = /^([0-9]|#|\*)+$/.test(this.props.lead.phone.replace(/[\+\-()\s]/g,''))
        if (this.state.onPhone) {
            Device.disconnectAll();
            // console.log(Device);
            // this.onAddNote();
        } else if (this.props.twilioToken && checkIsValidNumber) {
            Device.connect({ number: this.props.lead.phone });
            this.setState({
                onPhone: true,
            });
        }
    }

    render() {
        const {lead, leadNotes, leadStatuses, twilioToken} = this.props;
        const { onPhone } = this.state;
        return (
            <div className='lead-notes-profile-container'>
                <LeadModal size='small'/> 
                    <Segment className='lead-n-p-content'>
                        <div className="lead-n-p-row lead-n-p-row-top align-stretch">  
                            {/* <div className="btnClose" onClick={() => this.props.onClose()}><i className="flaticon stroke x-2"></i></div> */} 
                            <div className="title">Quick Preview</div> 
                            <div className="link-profile">
                                <Link to={`/companies/${lead.company_id}/leads/${lead.id}/notes`} className="btn">
                                    Profile
                                </Link>
                            </div>
                              
                        </div> 
                        <div className='lead-n-p-row align-center'>
                            <div className={`circle-label lead-status-${lead.status[0].toLowerCase()}`}>
                                {(lead.fullname && lead.fullname.charAt(0).toUpperCase()) || lead.status.charAt(0).toUpperCase()}
                                {
                                    lead.smsReplayCount && (
                                        <Label color='red' floating>
                                        {lead.smsReplayCount}
                                        </Label>
                                    ) || ( '' )
                                }
                            </div>
                            <div className='l-full-name'>{lead.fullname}</div>
                            <div className='l-email'>{lead.email}</div>
                            {
                                !lead.deleted_at && (
                                    <Grid.Column className="circle-button-groups">
                                        <div className={'ui secondary menu leadnotes'}>
                                            <Button circular className='email'
                                                    icon='ti-mail-forward ti'   as='a' href={`mailto:${lead.email}`}/>
                                            {
                                                twilioToken && <Button circular className={(onPhone ? 'endCall' : 'onCall')} icon='ti-phone ti'  onClick={this.onCall} />
                                            }
                                            
                                            <Button circular className='editlead'
                                                    icon='ti-pencil ti'  onClick={this.props.loadForm.bind(this, {
                                                ...lead,
                                                company_id: lead.company.id,
                                                show: true
                                            })}/>
                                            
                                        </div>
                                    </Grid.Column>
                                )
                            } 
                            
                            <TimeLine notes={leadNotes} lead={lead} 
                                      onAddNote={this.onAddNote}
                                      leadStatuses={leadStatuses}/>
                        </div>
                    </Segment> 
            </div>
        )
    }
}

export default compose(BreadCrumbContainer, LeadsContainer, LeadNotesContainer, LeadFormContainer)(LeadNotes);
