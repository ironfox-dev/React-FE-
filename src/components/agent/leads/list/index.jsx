import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Tab, List} from 'semantic-ui-react';
import * as moment from 'moment';
import './index.scss';

class LeadsList extends Component {
    render() {
        const {leads, statuses} = this.props;
        return (
            <Tab.Pane attached={false}>
                <List className='AgentLeadsList' relaxed='very'>
                    {
                        leads && leads.map((lead, key) => <List.Item key={key} className='listItem'>
                            <List.Content>
                                <List.Header as={Link} to={{
                                    pathname: `/companies/leads/${lead.id}/notes`,
                                    state: {lead}
                                }}>
                                    <div className={`lead-status-icon lead-status-${lead.status[0].toLowerCase()}`}>
                                        {(lead.fullname && lead.fullname[0]) || statuses[lead.status].icon}
                                    </div>
                                    {lead.fullname}
                                </List.Header>
                                <List.Description>
                                    <span className='company-name'>{lead.company.name}, </span>
                                    <span
                                        className='deal-name'>{lead.campaign.deal ? lead.campaign.deal.name : ''}</span>
                                    <span className='listItemTime'>{moment.utc(lead.created_at).local().fromNow()}</span>
                                </List.Description>
                            </List.Content>
                        </List.Item>)
                    }
                </List>
            </Tab.Pane>
        )
    }
}

export default LeadsList;