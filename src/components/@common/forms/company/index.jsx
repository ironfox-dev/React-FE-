import React, {Component} from 'react';
import * as R from 'ramda';
import {
    Form,
    Input,
    Segment,
    Button,
    Grid,
} from 'semantic-ui-react';
import './index.scss';
import avatarDemo from '../avatar-demo.png';
import {AvatarImage} from "components/@common/image";
import {disableAutoComplete} from '../../../../utils';

class CompanyForm extends Component {
    onFileLoad = (event) => {
        if (!R.pathOr(false, ['target', 'files'], event)) {
            this.props.sendMessage('Missing required File!', true);
            return false;
        }

        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.addEventListener('load', () => {
            this.props.changeForm({
                avatar: reader.result,
            });
        }, false);
    };

    onChange = (event, data) => {
        this.props.changeForm({[data.name]: data.value});
    };

    componentDidMount() {
        disableAutoComplete();
    }

    render() {
        const {
            id,
            name,
            phone,
            email,
            avatar,
            twilio_sid,
            twilio_token,
            avatar_path,
            twilio_mobile_number
        } = this.props.form;

        return (
            <Form size='big' className='companyForm' autoComplete='off'>
                <Grid columns={2} relaxed='very' stackable>
                    <Grid.Column>
                        <Form.Field required>
                            <label>Company Name</label>
                            <Input placeholder='Company Name' name='name' autoComplete='off' className='srch' value={name || ''} onChange={this.onChange}/>
                        </Form.Field>
                        <Form.Field required>
                            <label>Phone Number</label>
                            <Input placeholder='Phone Number' name='phone' autoComplete='off' value={phone || ''}
                                   onChange={this.onChange}/>
                        </Form.Field>
                        <Segment.Inline>
                            <AvatarImage size='tiny' circular src={avatar || avatar_path || avatarDemo}/>
                            <label htmlFor="avatar">
                                <Button
                                    icon="upload"
                                    label={{
                                        basic: true,
                                        content: 'Select file'
                                    }}
                                    labelPosition="right"
                                />
                                <input
                                    hidden
                                    accept=".png, .jpeg, .jpg, image/png, image/jpeg, image/jpg"
                                    id="avatar"
                                    type="file"
                                    onChange={this.onFileLoad}
                                />
                            </label>
                        </Segment.Inline>
                        <label className='note-label'>Add company logo (Optional)</label>
                    </Grid.Column>
                    <Grid.Column verticalAlign='middle'>
                        <Form.Field required>
                            <label>Email Address</label>
                            <Input placeholder='Email Address' name='email' value={email || ''}
                                   onChange={this.onChange}/>
                        </Form.Field>
                        <Form.Field required={(!id)}>
                            <label>Password ( min. 6 characters ) </label>
                            <Input placeholder='Password' name='password' type='password' onChange={this.onChange}/>
                        </Form.Field>
                        <Form.Field required={(!id)}>
                            <label>Re-enter Password</label>
                            <Input placeholder='Password' name='password_confirmation' type='password'
                                   onChange={this.onChange}/>
                        </Form.Field>

                    </Grid.Column>
                    <Grid.Row className="twilioContainer">
                        <Grid.Column>
                            <Form.Field>
                                <label>Twilio SID</label>
                                <Input placeholder='Twilio SID' name='twilio_sid' value={twilio_sid || ''}
                                       onChange={this.onChange}/>
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                        <Form.Field>
                            <label>Twilio Token</label>
                            <Input placeholder='Twilio Token' name='twilio_token' value={twilio_token || ''}
                                   onChange={this.onChange}/>
                        </Form.Field>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row className="twilioMobileContainer">
                       <Grid.Column>
                           <Form.Field>
                               <label>Twilio mobile number</label>
                               <Input placeholder='Twilio mobile number'
                                      name='twilio_mobile_number'
                                      value={twilio_mobile_number || ''}
                                      onChange={this.onChange}/>
                           </Form.Field>
                       </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Form>
        )
    }
}

export default CompanyForm;
