import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {compose} from 'recompose';
import {LeadsContainer, BreadCrumbContainer} from '@containers';
import {Tab, Menu, Label, Button, Segment, Grid, Select, Form, Input} from 'semantic-ui-react';
import './index.scss'
import LeadsList from "./list";
import * as moment from 'moment';

let scrollTime;
class AgentLeads extends Component {
    state = {
        scrollY: window.scrollY,
        dates: {    
            'today': {
                startDate: moment().startOf('day').format('Y-MM-DD'),
                endDate: moment().endOf('day').format('Y-MM-DD'),
            },
            'yesterday': {
                startDate: moment().subtract(1, 'days').startOf('day').format('Y-MM-DD'),
                endDate: moment().subtract(1, 'days').endOf('day').format('Y-MM-DD'),
            },
            'this-week': {
                startDate: moment().startOf('week').format('Y-MM-DD'),
                endDate: moment().endOf('week').format('Y-MM-DD'),
            },
            'previous-week': {
                startDate: moment().subtract(1, 'week').startOf('week').format('Y-MM-DD'),
                endDate: moment().subtract(1, 'week').endOf('week').format('Y-MM-DD'),
            },
            'this-month': {
                startDate: moment().startOf('month').format('Y-MM-DD'),
                endDate: moment().endOf('month').format('Y-MM-DD'),
            },
            'previous-month': {
                startDate: moment().subtract(1, 'month').startOf('month').format('Y-MM-DD'),
                endDate: moment().subtract(1, 'month').endOf('month').format('Y-MM-DD'),
            },
        }
    };

    componentWillMount() {
        const {tab} = this.props.match.params;
        this.defaultActiveIndex = 0
        if (tab && tab === 'new') {
            this.defaultActiveIndex = 1
        }
        this.props.agentLeadsByStatuses([]);
        this.props.addBreadCrumb({
            name: 'Leads',
            path: '/agents',
            active: true,
        });
    }

    componentDidMount() {
        if (this.defaultActiveIndex === 1) {
            this.showFreshLeads()
        }
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        const {pagination} = this.props;
        clearInterval(scrollTime);
        scrollTime = setTimeout( () => {
            this.props.scrollToPage(pagination.current_page + 1);
        }, 1000);
    };

    showAllLeads = () => {
        this.setState({
            pageStart: 0,
        });
        this.props.agentLeadsByStatuses([]);
    };

    showFreshLeads = () => {
        this.setState({
            pageStart: 0,
        });
        this.props.agentLeadsByStatuses(['NEW']);
    };

    showContactedLeads = () => {
        this.setState({
            pageStart: 0,
        });
        this.props.agentLeadsByStatuses(['CONTACTED_SMS', 'CONTACTED_CALL', 'CONTACTED_EMAIL']);
    };

    showViewedLeads = () => {
        this.setState({
            pageStart: 0,
        });
        this.props.agentLeadsByStatuses(['VIEWED']);
    };

    showSoldLeads = () => {
        this.setState({
            pageStart: 0,
        });
        this.props.agentLeadsByStatuses(['SOLD']);
    };

    onSearch = (event, data) => {
        this.props.searchAgentLeads(data.value);
    };

    onChangeDate = (event, data) => {
        this.props.filterAgentLeads({
            startDate: this.state.dates[data.value].startDate,
            endDate: this.state.dates[data.value].endDate,
        });
    };

    render() {
        const {agentLeads, statuses, newLeadsCount, query} = this.props;
        const panes = [
            {
                menuItem: (
                    <Menu.Item key='all' onClick={this.showAllLeads}>
                        All
                    </Menu.Item>
                ), render: () => (
                    <div className="tab-panel">
                        <Input icon='search' placeholder='Search...' onChange={this.onSearch} value={query.search || ''}/>
                        <LeadsList statuses={statuses} leads={agentLeads}/>
                    </div>
                )
            },
            {
                menuItem: (
                    <Menu.Item key='fresh' onClick={this.showFreshLeads}>
                        New<Label>{newLeadsCount}</Label>
                    </Menu.Item>
                ), render: () => (
                    <div className="tab-panel">
                        <Input icon='search' placeholder='Search...' onChange={this.onSearch} value={query.search || ''}/>
                        <LeadsList statuses={statuses} leads={agentLeads}/>
                    </div>
                )
            },
            {
                menuItem: (
                    <Menu.Item key='contacted' onClick={this.showContactedLeads}>
                        Contacted
                    </Menu.Item>
                ), render: () => (
                    <div className="tab-panel">
                        <Input icon='search' placeholder='Search...' onChange={this.onSearch} value={query.search || ''}/>
                        <LeadsList statuses={statuses} leads={agentLeads}/>
                    </div>
                )
            },
            {
                menuItem: (
                    <Menu.Item key='followup' onClick={this.showViewedLeads}>
                        Follow up
                    </Menu.Item>
                ), render: () => (
                    <div className="tab-panel">
                        <Input icon='search' placeholder='Search...' onChange={this.onSearch} value={query.search || ''}/>
                        <LeadsList statuses={statuses} leads={agentLeads}/>
                    </div>
                )
            },
            {
                menuItem: (
                    <Menu.Item key='soldout' onClick={this.showSoldLeads}>
                        Sold
                    </Menu.Item>
                ), render: () => (
                    <div className="tab-panel">
                        <Input icon='search' placeholder='Search...' onChange={this.onSearch} value={query.search || ''}/>
                        <LeadsList statuses={statuses} leads={agentLeads}/>
                    </div>
                )
            },


        ];
        return (
            <div className='AgentLeads'>
                <Segment basic>
                    <Grid columns={2}>
                        <Grid.Column>
                            <h1 className="ui left floated header mobile-app-menu">Leads</h1>
                        </Grid.Column>
                        <Grid.Column>

                            <Form>
                                <Form.Group widths='equal'>
                                    <Form.Field
                                        required
                                        control={Select}
                                        options={this.props.selectBoxDates || []}
                                        placeholder="Select Date"
                                        defaultValue='today'
                                        onChange={this.onChangeDate}
                                        searchInput={{id: 'leads-date'}}
                                    />
                                </Form.Group>
                            </Form>

                        </Grid.Column>
                    </Grid>
                </Segment>
                <Segment basic>
                    <Tab menu={{secondary: true}} panes={panes} defaultActiveIndex={this.defaultActiveIndex}/>
                </Segment>
                <Link to='/companies/leads/new/create'>
                    <Button circular primary size='massive' icon='plus' className='add-lead'/>
                </Link>
            </div>)
    }
}

export default compose(LeadsContainer, BreadCrumbContainer)(AgentLeads);