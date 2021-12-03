import React, {Component} from 'react';
import * as moment from 'moment';
import './index.scss';
import {Confirm, Icon} from "semantic-ui-react";

export class LeadReminder extends Component {

    state = {
        open: false,
        reminder: null
    };

    componentWillMount() {}

    editReminder = (reminder) => {
        this.props.onEdit(reminder);
    }

    openConfirmModal = (open = true, reminder = null) => {
        this.setState({open, reminder});
    };

    onConfirm = () => {
        this.setState({open: false});
        this.props.onDelete(this.state.reminder);
    };

    render() {
        const {reminders} = this.props;
        return (
            <div>
                <Confirm open={this.state.open} onCancel={this.openConfirmModal.bind(this, false)}
                         onConfirm={this.onConfirm}/>
                {
                    reminders && reminders.map(reminder =>
                        <div className='reminder' key={reminder.id} onClick={() => this.editReminder(reminder)}>
                            <div className='reminder-content'>
                                <span className='icon-delete-reminder' onClick={(e) => {e.stopPropagation();this.openConfirmModal(true, reminder)}}>
                                    <Icon name='delete' size='small' />
                                </span>
                                <span>{reminder.name}</span>
                            </div>
                            <div className='reminder-datetime'>
                                <span className='reminder-created-time'>
                                    {moment.utc(reminder.time).local().format('DD.MM.YYYY')}
                                </span>
                              <span className='reminder-created-time hour'>
                                    {moment.utc(reminder.time).local().format('LT')}
                                </span>
                            </div>

                        </div>
                    )
                }
            </div>
        );
    }
}