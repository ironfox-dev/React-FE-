import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Grid, Header} from 'semantic-ui-react';
import {compose, lifecycle} from 'recompose';
import './index.scss';
import {Breadcrumb} from 'components';
import {ProfileContainer, AuthContainer} from '@containers';

const LayoutHeader = ({profile, adminAccessToken, loginToAdmin}) => (
    <div className='freshAppHeader'>
        <Grid columns={2} stackable>
            <Grid.Row verticalAlign="middle">
                <Grid.Column>
                    <Breadcrumb/>
                </Grid.Column>
                <Grid.Column textAlign='right'>
                    <Link to='/profile'>
                        <Header as='h2'>
                            {profile.name}
                        </Header>
                    </Link>
                    {
                        (adminAccessToken
                        ?  <Button secondary onClick={loginToAdmin}>Back to admin</Button>
                        : null)
                    }

                </Grid.Column>
            </Grid.Row>
        </Grid>
    </div>
);

export default compose(ProfileContainer, AuthContainer, lifecycle({
    componentWillMount() {
        this.props.getUserProfile();
    }
}))(LayoutHeader);