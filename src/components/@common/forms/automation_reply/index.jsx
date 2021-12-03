import React, {Component} from 'react';
import * as R from 'ramda';

import {
    Form,
    Grid,
    Select,
    Dropdown,
} from 'semantic-ui-react';
import './index.scss';
import {
    LEAD_REPLY_TYPE_SMS_REPLY,
    LEAD_REPLY_TYPE_SMS_REPLY_CONTAIN,
    leadReplyTypes
} from "@containers/forms/automation_reply/leadReplyType";

class AutomationReplyForm extends Component {

    state = {
        options: [],
        values: [],
        leadReplyContains: false,
    }

    componentDidMount() {
        this.props.changeForm({ deal_id: this.props.dealId });
        let values = R.pathOr('', ['form', 'lead_reply_contains'], this.props);
        values = values.split(',');
        const options = values && values.map(value => ({
            value,
            key: value,
            text: value,
        }));


        this.setState({
            values,
            options
        })
    }

    onChange = (event, data) => {
        this.props.changeForm({[data.name]: data.value});
    };

    handleChange = (e, { value: values }) => {
        this.setState({ values });
        this.props.changeForm({ lead_reply_contains: values.join(',') });
    }
    handleSearchChange = (e, { searchQuery }) => {
        this.setState({ searchQuery });
    }

    onAddItem = (e) => {
        if (e.keyCode === 13) {
            this.setState({
                options: [...this.state.options, {
                    value: this.state.searchQuery,
                    key: this.state.searchQuery,
                    text: this.state.searchQuery,
                }],
            });
        }
    };

    render() {
        const { lead_reply_type = LEAD_REPLY_TYPE_SMS_REPLY } = this.props.form;
        const { leadReplyContains } = this.state;
        const { options, values } = this.state;

        return (<Form size='big' className='textMessage' autocomplete='off'>
            <Grid columns={1} relaxed='very' stackable>
                <Grid.Column>
                    <Form.Field required>
                        <label>On Reply</label>
                        <Select placeholder='Select action type'
                                name='lead_reply_type'
                                options={leadReplyTypes}
                                defaultValue={lead_reply_type || LEAD_REPLY_TYPE_SMS_REPLY}
                                onChange={this.onChange} />
                    </Form.Field>
                    {
                        lead_reply_type === LEAD_REPLY_TYPE_SMS_REPLY_CONTAIN && (
                          <Form.Field required={leadReplyContains}>
                              <label>Reply contains</label>
                              <Dropdown
                                className="onReplayContains"
                                onKeyDown={this.onAddItem}
                                fluid
                                multiple
                                selection
                                allowAdditions
                                search
                                options={options}
                                value={values}
                                placeholder='Add Users'
                                onChange={this.handleChange}
                                onSearchChange={this.handleSearchChange}
                              />
                          </Form.Field>
                        )
                    }
                </Grid.Column>
            </Grid>
        </Form>)
    }
}

export default AutomationReplyForm;
