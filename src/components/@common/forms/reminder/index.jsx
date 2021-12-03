import React, {Component} from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { IconButton, InputAdornment } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker } from "@material-ui/pickers";

import {
    Form,
    Input,
    Grid,
    Icon
} from 'semantic-ui-react';
import './index.scss';
import {disableAutoComplete} from '../../../../utils';

class ReminderForm extends Component {

    onChange = (event, data) => {
        this.props.changeForm({[data.name]: data.value});
    };

    handleDateChange = (date) => {
        this.props.changeForm({time: date});
    }

    componentDidMount() {
        disableAutoComplete();
    }

    render() {
        const {id, name, time} = this.props.form;
        return (
            <Form size='tiny' className='reminderForm'>
                <Grid columns={1} relaxed='very' stackable>
                    <Grid.Column>
                        <Form.Field required>
                            <label>Reminder Note</label>
                            <Input placeholder='Add note' name='name' value={name || ''} onChange={this.onChange}/>
                        </Form.Field>
                        <Form.Field required>
                            <label>Date Time</label>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DateTimePicker
                                    autoOk
                                    ampm={true}
                                    minDate={new Date()}
                                    value={ time || new Date()}
                                    onChange={this.handleDateChange}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton>
                                                    <Icon name='alarm' size='small' />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Form.Field>
                    </Grid.Column>
                </Grid>
            </Form>
        )
    }
}

export default ReminderForm;