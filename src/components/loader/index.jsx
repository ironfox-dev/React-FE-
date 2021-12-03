import React from 'react';
import {LoaderContainer} from '@containers';

import {
    Dimmer,
    Loader as SemanticLoader
} from 'semantic-ui-react';
import './index.scss';

const Loader = (props) => (
    <div className='Loader'>
        <Dimmer className="ui page dimmer" active={!props.loadReady} inverted>
            <SemanticLoader size='large'></SemanticLoader>
        </Dimmer>
    </div>
);

export default LoaderContainer(Loader)