import React, {Component} from 'react';
import * as R from 'ramda';

import {
    Form,
    Input,
    TextArea,
    Grid,
    Select, Checkbox,
} from 'semantic-ui-react';
import './index.scss';
import {checkTypeIsDays, delayTypes} from "@containers/forms/automation/delayTypes";
import {actionTypes} from "@containers/forms/automation/actionTypes";
import {DELAY_TYPE_TIME} from "@containers/forms/automation/delayTypes";
import JoditEditor from "jodit-react";
import {
    checkIsTypeEmail,
    checkIsTypeText,
    checkIsTypePushNotification,
    TYPE_SMS_MESSAGE
} from "@containers/forms/automation/actionTypes";
import {checkIsTypeStatusChange} from "@containers/forms/automation/actionTypes";
import {daysToSeconds, secondsToDays, secondsToTime} from "./modules";
import {timeToSeconds} from "./modules/timeToSeconds";
import {
    LEAD_REPLY_TYPE_MAIL_OPEN, LEAD_REPLY_TYPE_NONE,
    LEAD_REPLY_TYPE_SMS_REPLY
} from "../../../../@containers/forms/automation/leadReplyType";
import {TYPE_EMAIL_MESSAGE} from "../../../../@containers/forms/automation/actionTypes";

const editor = React.createRef();
const config = {
    readonly: false,
};

class AutomationForm extends Component {

    state = {
        content: '',
        subject: '',
        hours: 0,
        minutes: 0,
    }

    componentDidMount() {
        this.props.changeForm({ deal_id: this.props.dealId });
        this.setState({
            content: R.pathOr('', [
              'form',
              'object',
              'message'
            ], this.props),
            subject: R.pathOr('', [
              'form',
              'object',
              'subject'
            ], this.props),
        });
        const { is_root, type, lead_reply_type } = this.props.form;
        if (type === TYPE_SMS_MESSAGE && is_root && lead_reply_type === LEAD_REPLY_TYPE_NONE ) {
            this.props.changeForm({ lead_reply_type: LEAD_REPLY_TYPE_SMS_REPLY });
        }
        else if (type === TYPE_EMAIL_MESSAGE && is_root && lead_reply_type === LEAD_REPLY_TYPE_NONE) {
            this.props.changeForm({ lead_reply_type: LEAD_REPLY_TYPE_MAIL_OPEN });
        }
    }

    onChange = (event, data) => {
        this.props.changeForm({[data.name]: data.value});
    };

    onChangeType = (event, data) => {
        this.props.changeForm({ type: data.value });
    };

    onChangeStopOnManualChange = () => {
        this.props.changeForm({ stop_on_manual_contact: !this.props.form.stop_on_manual_contact });
    };

    onChangeLeadStatus = (event, data) => {
        this.props.changeForm({ object: {
             status: data.value,
        }});
    };

    onChangeTimeHours = (event) => {
        const hours = event.target.value;
        this.setState({
            hours
        });
        this.props.changeForm({ delay_time: timeToSeconds(hours, this.state.minutes) });
    };

    onChangeTimeMinutes = (event) => {
        const minutes = event.target.value;
        this.setState({
            minutes
        })
        this.props.changeForm({ delay_time: timeToSeconds(this.state.hours, minutes) });
    };

    onChangeDays = (event) => {
        const days = event.target.value;
        this.setState({
            hours: 0,
            minutes: 0
        });
        this.props.changeForm({ delay_time: daysToSeconds(days) });
    };

    onChangeEmailMessage = (message) => {
        const { object } = this.props.form;
        this.props.changeForm({ object: { ...(object || {}), message: message } });
    };

    onChangeEmailSubject = (event) => {
        const { object } = this.props.form;
        this.props.changeForm({ object: { ...(object || {}), subject: event.target.value } });
    };

    onTextMessageChange = (event) => {
        const { object } = this.props.form;
        this.props.changeForm({ object: { ...(object || {}), message: event.target.value } });
    };

    render() {
        const { type = TYPE_SMS_MESSAGE,
            delay_type,
            delay_time,
            stop_on_manual_contact,
            object
        } = this.props.form;
        const { selectBoxStatuses } = this.props;
        const { content } = this.state;
        const time = secondsToTime(delay_time);

        return (<Form size='big' className='textMessage' autoComplete='off'>
            <Grid columns={1} relaxed='very' stackable>
                <Grid.Column>
                    <Form.Field required>
                        <label>Action type</label>
                        <Select placeholder='Select action type'
                                name='type'
                                options={actionTypes}
                                defaultValue={type || TYPE_SMS_MESSAGE}
                                onChange={this.onChangeType} />
                    </Form.Field>
                    <Form.Field>
                        <label>Delay</label>
                        <div className="times">
                            {
                                checkTypeIsDays(delay_type) && <div className="days">
                                    <Input
                                      placeholder="0"
                                      min="0"
                                      step="1"
                                      type="number"
                                      value={secondsToDays(delay_time || 0)}
                                      onChange={this.onChangeDays}
                                    />
                                </div>
                            }
                            {
                                !checkTypeIsDays(delay_type) && <>
                                    <div className="hours">
                                        <Input placeholder="HH"
                                               min="0"
                                               step="1"
                                               type="number"
                                               value={time.h}
                                               onChange={this.onChangeTimeHours}/>
                                    </div>
                                    <div className="minutes">
                                        <Input placeholder="mm"
                                               min="0"
                                               step="1"
                                               type="number"
                                               value={time.m}
                                               onChange={this.onChangeTimeMinutes}/>
                                    </div>
                                </>
                            }
                            <div className="selectDelay">
                                <Select placeholder="Select delay"
                                        name="delay_type"
                                        options={delayTypes}
                                        defaultValue={delay_type || DELAY_TYPE_TIME}
                                        onChange={this.onChange} />
                            </div>
                        </div>
                    </Form.Field>
                    {
                        (
                          checkIsTypeText(type) ||
                          checkIsTypePushNotification(type)
                        ) && (
                          <Form.Field required>
                              <TextArea onChange={this.onTextMessageChange} value={object && object.message || ''} />
                          </Form.Field>
                        )
                    }

                    {
                        checkIsTypeEmail(type) && (
                          <Input type="text" placeholder="Subject" value={object && object.subject || ''} onChange={this.onChangeEmailSubject}/>
                        )
                    }
                    {
                        checkIsTypeEmail(type) && (
                          <Form.Field required>
                              <JoditEditor
                                ref={editor}
                                value={content}
                                config={config}
                                tabIndex={1}
                                onChange={this.onChangeEmailMessage}
                              />
                          </Form.Field>
                        )
                    }
                    {
                        checkIsTypeStatusChange(type) && (
                          <Form.Field required>
                              <Select placeholder="Select Status"
                                      name="status"
                                      options={selectBoxStatuses}
                                      defaultValue={object && object.status || 'NONE'}
                                      onChange={this.onChangeLeadStatus} />
                          </Form.Field>
                        )
                    }
                    <Form.Field>
                        <Checkbox
                          label="Stop on manual contact"
                          name="stop_on_manual_contact"
                          checked={!!stop_on_manual_contact}
                          toggle
                          onChange={this.onChangeStopOnManualChange}
                        />
                    </Form.Field>
                </Grid.Column>
            </Grid>
        </Form>)
    }
}

export default AutomationForm;
