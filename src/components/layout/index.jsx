import {Grid, Icon, Responsive, Segment, Sidebar, Menu} from 'semantic-ui-react'
import React, {Component} from 'react'
import AppSidebar from '../sidebar'
import Container from './container'
import Header from './header'
import Footer from './footer'
import './index.scss'
import {Auth} from "@services";

const getWidth = () => {
    const isSSR = typeof window === 'undefined'
    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

class DesktopContainer extends Component {
    state = {}
    render() {
        return (
            <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
                <div className='freshAppLayout'>
                    <Grid padded='horizontally' columns={2}>
                        <Grid.Column width={1}>
                            <AppSidebar />
                        </Grid.Column>
                        <Grid.Column width={15}>
                            {
                                !Auth.isAgent ? <Header/> : null
                            }
                            <Container/>
                            <Footer/>
                        </Grid.Column>
                    </Grid>
                </div>
            </Responsive>
        )
    }
}

class MobileContainer extends Component {
    state = {}

    handleSidebarHide = () => this.setState({sidebarOpened: false})
    handleToggle = () => this.setState({sidebarOpened: true})
    render() {
        const {sidebarOpened} = this.state

        return (
            <Responsive as={Sidebar.Pushable} getWidth={getWidth} maxWidth={Responsive.onlyMobile.maxWidth}>
                <Sidebar
                    animation='push'
                    onHide={this.handleSidebarHide}
                    visible={sidebarOpened}>
                    <AppSidebar onClickMenuItem={this.handleSidebarHide}/>
                </Sidebar>

                <Sidebar.Pusher dimmed={sidebarOpened}>
                    <Segment
                        textAlign='center'
                        style={{padding:0}}>
                        {/*<Container>*/}
                        <Menu pointing secondary size='large' style={{margin:0, display:"unset"}}>
                            <Menu.Item style={{ zIndex:9999, position:"absolute", top:"40px", left:"10px"}} onClick={this.handleToggle}>
                                <Icon name='sidebar'/>
                            </Menu.Item>
                        </Menu>
                        {/*</Container>*/}
                        <Grid padded='horizontally'>
                            <Grid.Column>
                                {
                                    !Auth.isAgent ? <Header/> : null
                                }
                                <Container/>
                                <Footer/>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                </Sidebar.Pusher>
            </Responsive>
        )
    }
}

const Layout = () => (
    <div>
        <DesktopContainer/>
        <MobileContainer/>
    </div>
)

export default Layout
