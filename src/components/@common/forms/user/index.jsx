import React, {Component} from 'react';
import * as R from 'ramda';
import {
    Form,
    Input,
    Segment,
    Button,
    Grid, Select,
} from 'semantic-ui-react';
import './index.scss';
import avatarDemo from '../avatar-demo.png';
import {AvatarImage} from "components/@common/image";
import {disableAutoComplete} from '../../../../utils';

const SUBSCRIPTIONS = [
    {
        key: 'NONE',
        value: null,
        text: 'NONE',
    },
    {
        key: 'BASE',
        value: 'BASE',
        text: 'BASE',
    },
    {
        key: 'PREMIUM',
        value: 'PREMIUM',
        text: 'PREMIUM',
    }
];

class UserForm extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }
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

    onChangeSubscription = (event, data) => {
        this.props.changeForm({ subscription_type: data.value });
        if (data.value === 'BASE' && (this.props.form.max_agency_companies > 5 || !this.props.form.max_agency_companies)) {
            this.props.changeForm({ max_agency_companies: 5 });
        } else if (data.value === 'PREMIUM' && this.props.form.max_agency_companies < 10) {
            this.props.changeForm({max_agency_companies: 10});
        } else {
            this.props.changeForm({max_agency_companies: 0});
        }
    };

    componentDidMount() {
        disableAutoComplete();
    }

    render() {
        const {
            id, role, name, phone, email, avatar,
            avatar_path, subscription_type, max_agency_companies
        } = this.props.form;

        return (
            <Form size='big' className='companyForm'>
                <Grid columns={2} relaxed='very' stackable>
                    <Grid.Column>
                        <Form.Field required>
                            <label>User Name</label>
                            <Input placeholder='User Name'
                                   ref={this.inputRef}
                                   data-lpignore="true"
                                   name='name' value={name || ''} onChange={this.onChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Phone Number</label>
                            <Input placeholder='Phone Number' name='phone' value={phone || ''}
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
                        {
                            role === 'AGENCY'
                                ?  <Form.Field required>
                                    <label>Subscription Type</label>
                                    <Form.Field
                                        control={Select}
                                        options={SUBSCRIPTIONS}
                                        label={{ children: 'Subscription', htmlFor: 'sub-form-companies-list' }}
                                        placeholder='Select subscription'
                                        search
                                        defaultValue={subscription_type || 'BASE'}
                                        onChange={this.onChangeSubscription}
                                        searchInput={{ id: 'sub-form-companies-list' }}
                                    />
                                </Form.Field>
                                : null
                        }
                    </Grid.Column>
                    <Grid.Column verticalAlign='middle'>
                        <Form.Field required>
                            <label>Email Address</label>
                            <Input placeholder='Email Address' name='email' value={email || ''}
                                   onChange={this.onChange}/>
                        </Form.Field>
                        <Form.Field required={(!id)}>
                            <label>Password</label>
                            <Input placeholder='Password' name='password' type='password' onChange={this.onChange}/>
                        </Form.Field>
                        <Form.Field required={(!id)}>
                            <label>Re-enter Password</label>
                            <Input placeholder='Password' name='password_confirmation' type='password'
                                   onChange={this.onChange}/>
                        </Form.Field>
                        {
                            role === 'AGENCY'
                                ?   <Form.Field>
                                        <label>Max Agency companies can create</label>
                                        <Input placeholder='Max Agency companies'
                                               name='max_agency_companies'
                                               min={0}
                                               value={max_agency_companies}
                                               type='number'
                                               onChange={this.onChange}/>
                                     </Form.Field>
                                : null
                        }
                    </Grid.Column>
                </Grid>
            </Form>
        )
    }
}

export default UserForm;