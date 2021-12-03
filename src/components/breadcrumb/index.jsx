import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'semantic-ui-react'
import { BreadCrumbContainer } from '@containers'
import './index.scss';

class AppBreadcrumb extends Component {
  render() {
    const { breadcrumbs } = this.props;
    return (<div className='freshAppBreadcrumb'>
      <Breadcrumb size='small'>
        {
          breadcrumbs.map((crumb, i) => {
            if (!crumb.active) {
              return (<span key={i} >
            <Breadcrumb.Section link={false}>
              <Link to={crumb.path}>{crumb.name}</Link>
            </Breadcrumb.Section>
            <Breadcrumb.Divider content='/' />
          </span>)
            } else {
              return <Breadcrumb.Section key={i} link={false} active={true}>{crumb.name}</Breadcrumb.Section>
            }
          })
        }
      </Breadcrumb>
    </div>)
  }
};

export default BreadCrumbContainer(AppBreadcrumb);