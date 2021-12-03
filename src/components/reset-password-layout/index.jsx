import React, {Component} from 'react'
import {Redirect} from 'react-router-dom';
import {compose} from 'recompose';
import {AuthContainer} from "@containers";
import {Button, Form, Grid, Header, Image, Segment} from 'semantic-ui-react'
import './index.scss';
import logo from '../static/assets/logo.png';
import {disableAutoComplete} from '../../utils';

class ResetPassword extends Component {
    email = '';

    onEmailChange = (event) => {
        this.email = event.target.value;
    };


    resetPassword = () => {
        this.props.resetPassword(this.email);
    };

    async componentWillMount() {
        await this.props.autoLogin();
    }

  componentDidMount() {
    disableAutoComplete();
  }

    render() {
        return (
            <div className='login-form'>
                {
                    this.props.isAuthorised ? <Redirect from='/login' to='/dashboard'/> : null
                }
                <Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle'>
                    <Grid.Column style={{maxWidth: 450}} className="logincontainer">
                        <Form size='large' onSubmit={this.login}>
                           <Segment stacked>
                               <Header as='h2' color='teal' textAlign='center'>
                                   <Image src={logo}/>
                               </Header>
                               <label><a href="/login"> Back to Login!</a></label>
                               <p> Reset Password </p>
                                <label>E-mail address</label>
                                <Form.Input
                                    fluid
                                    icon={{className: 'linearicons-user'}}
                                    iconPosition='left'
                                    placeholder='E-mail address'
                                    type='text'
                                    onChange={this.onEmailChange}/>
                                <Button color='teal' onClick={this.resetPassword} fluid size='large'>
                                    Reset password
                                </Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default compose(AuthContainer)(ResetPassword);