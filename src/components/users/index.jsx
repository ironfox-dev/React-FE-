import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import UserModal from '../@common/modals/user';
import {compose} from 'recompose';
import {UsersContainer, BreadCrumbContainer, UserFormContainer,AuthContainer} from '@containers';
import Loader from '../loader';
import {
    Table,
    Segment,
    Pagination,
    Button,
    Checkbox,
    Header,
    Form,
    Input,
    Icon,
    Grid,
    Menu, Confirm,
} from 'semantic-ui-react';
import './index.scss';
import * as R from "ramda";

class Users extends Component {
    state = {
        open: false,
        userId: null,
        ready: false,
    };

    componentWillMount() {
        this.props.addBreadCrumb({
            name: 'Users',
            path: '/users',
            active: true,
        }, true);
        this.props.loadUsers();
    }

    getSort = field => {
        const fieldStatus = R.path(['query', 'sort', field], this.props);
        if (fieldStatus === true) {
            return 'sort amount down';
        }
        if (fieldStatus === false) {
            return 'sort amount up';
        }
        return 'sort';
    };

    loadUserPage = (event, data) => {
        this.props.gotoUserPage(data.activePage);
    };

    onSearch = event => {
        this.props.searchUsers(event.target.value)
    };

    onShowArchived = () => {
        this.props.toggleShowDeleted();
    };

    openConfirmModal = (open = true, userId = null) => {
        this.setState({open, userId})
    };

    onConfirm = () => {
        this.setState({open: false});
        this.props.deleteUser(this.state.userId);
    };

    autologin = email => {
        this.props.autoLoginBy(email);
    };

    render() {
        const users = this.props.users || [];
        const {pagination, query} = this.props;
        return (
            <div className='Companies'>
                <UserModal/>
                <Segment attached='top'>
                    <Confirm open={this.state.open} onCancel={this.openConfirmModal.bind(this, false)}
                             onConfirm={this.onConfirm}/>
                    <Grid columns={2}>
                        <Grid.Column>
                            <Header floated='left' as='h1'>Users</Header>
                            <Form.Field>
                                <Checkbox label='Show Archived' toggle onChange={this.onShowArchived}/>
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                            <Menu secondary>
                                <Menu.Menu position='right'>
                                    <Menu.Item>
                                        <Input icon='search'
                                               onChange={this.onSearch}
                                               value={query.search} placeholder='Search...'/>
                                    </Menu.Item>
                                    <Button
                                        onClick={this.props.loadForm.bind(this, {show: true})}
                                        color='teal'
                                        content='New User'
                                    />
                                </Menu.Menu>
                            </Menu>
                        </Grid.Column>
                    </Grid>
                    <Segment basic>
                        <Loader/>
                        <Table singleLine>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Name
                                        <Icon name={this.getSort('name')}
                                              onClick={this.props.sort.bind(this, 'name')}/>
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>UUID</Table.HeaderCell>
                                    <Table.HeaderCell>Subscription</Table.HeaderCell>
                                    <Table.HeaderCell>E-mail
                                        <Icon name={this.getSort('email')}
                                              onClick={this.props.sort.bind(this, 'email')}/>
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>Role
                                        <Icon name={this.getSort('role')}
                                              onClick={this.props.sort.bind(this, 'role')}/>
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>Phone
                                        <Icon name={this.getSort('phone')}
                                              onClick={this.props.sort.bind(this, 'phone')}/>
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>Actions</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {
                                    users.map((user, index) => (
                                        <Table.Row key={index}>
                                            <Table.Cell>{user.name}</Table.Cell>
                                            <Table.Cell>{user.uuid}</Table.Cell>
                                            <Table.Cell>{user.subscription_type}</Table.Cell>
                                            <Table.Cell>{user.email}</Table.Cell>
                                            <Table.Cell>{user.role}</Table.Cell>
                                            <Table.Cell>{user.phone}</Table.Cell>
                                            <Table.Cell>
                                                { !user.deleted_at
                                                    ? <div>
                                                        <Button onClick={this.props.loadForm.bind(this, {
                                                            ...user,
                                                            show: true
                                                        })}>Edit</Button>
                                                        <Button onClick={this.openConfirmModal.bind(this, true, user.id)}>Delete</Button>
                                                        <Button primary onClick={this.autologin.bind(this, user.email)}>Login</Button>
                                                    </div>
                                                    : null}
                                            </Table.Cell>
                                        </Table.Row>
                                    ))
                                }
                            </Table.Body>
                        </Table>
                    </Segment>
                </Segment>
                <Segment textAlign='right' attached='bottom'>
                    <Pagination onPageChange={this.loadUserPage}
                                defaultActivePage={pagination.current_page}
                                prevItem={null}
                                nextItem={null}
                                totalPages={pagination.last_page}/>
                </Segment>
            </div>
        );
    }
}

export default compose(UsersContainer, UserFormContainer, AuthContainer, BreadCrumbContainer)(Users);