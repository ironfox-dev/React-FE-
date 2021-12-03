import React, { Component } from 'react';
import * as R from 'ramda';
import './index.scss';

export class AvatarImage extends Component {
  render() {
    const { src, ...props } = this.props;
    return <div style={{
      backgroundImage: `url('${src}')`
    }} className={R.keys(props).join(' ').concat(' icon-image')}/>
  }
}
