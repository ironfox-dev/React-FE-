import React from 'react';
import {withRouter} from 'react-router-dom';
import Routes from 'components/routers';

import './index.scss';

const Container = (props) => (
    <div className='freshAppContainer'>
        <Routes/>
    </div>);

export default withRouter(Container)