import React, { Component }  from 'react';
import {IntegrationOptionFormContainer} from "@containers";
import { Loader } from 'components';
import { Button, Icon } from 'semantic-ui-react';
import './index.scss';
import OptinForm from "./form";
import {disableAutoComplete} from '../../utils';

class OptinFormPage extends Component {
  async componentWillMount() {
    const { uuid } = this.props.match.params;
    await this.props.loadCampaignBy(uuid);
  }

  onChange = (event, data) => {
    this.props.changeForm({
      [data.name]: data.value,
    })
  };

  onSubmit = () => {
    this.props.createLead(this.props.form);
  };
  onResend = () => {
    this.props.resetForm({ showResend: false });
  };

  componentDidMount() {
    disableAutoComplete();
  }

  render() {
    const { integrationForm, integrationFormFields, form } = this.props;
    return (<div className='OptionForm'>
      <Loader />
      {
        form.showResend
          ? <div className='resend'>
              <div>
                <div className='resend-icon'>
                  <Icon name='check circle outline' size='massive' />
                </div>
                <h3>
                  Form Sent
                </h3>
              </div>
              <Button basic onClick={this.onResend}>Resend</Button>
            </div>
          : <OptinForm integrationForm={integrationForm}
                       integrationFormFields={integrationFormFields}
                       form={form}
                       onSubmit={this.onSubmit}
                       onChange={this.onChange}
        />
      }

    </div>)
  }
}

export default IntegrationOptionFormContainer(OptinFormPage);