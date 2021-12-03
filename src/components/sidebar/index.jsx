import React, {Component} from 'react'
import {compose} from 'recompose';
import {Link} from 'react-router-dom'
import {MenuContainer, AuthContainer, ProfileContainer} from "@containers";
import PropTypes from 'prop-types';

import {Menu, Image} from 'semantic-ui-react'
import logo from '../static/assets/logo.png';
import './index.scss';
import {Auth} from "@services";
import {AvatarImage} from "components/@common/image";

class AppSidebar extends Component {

    logout = () => {
        this.props.logout();
        this.onItemClick();
    };

    componentWillMount() {
        this.props.getUserSideBarMenu(Auth.role);
    }

    onItemClick = () => {
        this.props.onClickMenuItem && this.props.onClickMenuItem()
    }

    render() {
        const {visibleMenus, profile} = this.props;
        return (
            <Menu className='AppSidebar' fixed='left' vertical={true} icon={true}>
                <Menu.Item className='app-logo' onClick={this.onItemClick}>
                     <span className='ti ti-copyright logo'/>
                </Menu.Item>
				<p className='sidebar-title'>Menu</p>
                {
                    visibleMenus.map((menu, i) => (
                        <Link to={menu.path} key={i} onClick={this.onItemClick}>
                            <Menu.Item index={i}>
                                <i className={menu.icon}/>
                                <div>{menu.name}</div>
                            </Menu.Item>
                        </Link>
                    ))
                }
				
                <div className='sidebar-bootom'>
				<p className='sidebar-title'>Links</p>
                    <a href='http://support.convertlead.com' target='_blank' onClick={this.onItemClick}>
                        <i className='ti ti-brand-hipchat'/>
                    </a>
                    <Menu.Item onClick={this.logout}>
                        <i className='ti ti-power'/>
                    </Menu.Item>
                    <Link to='/profile' onClick={this.onItemClick}>
                        <AvatarImage src={profile.avatar_path} sidebar-avatar rounded size='tiny'/>
                    </Link>
                </div>
            </Menu>
        )
    }
}

AppSidebar.propTypes = {
    visibleMenus: PropTypes.array.isRequired
};

export default compose(ProfileContainer, MenuContainer, AuthContainer)(AppSidebar);

