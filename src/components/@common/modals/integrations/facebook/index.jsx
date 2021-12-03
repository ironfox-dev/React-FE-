import { compose } from 'recompose';
import * as R from 'ramda';
import React, { Component } from 'react'
import { Button, Modal, Table, Select } from 'semantic-ui-react'
import {MessagesContainer} from "@containers";

import './index.scss';
import {Facebook} from "@services";
import {disableAutoComplete} from '../../../../../utils';

class FacebookIntegrationModal extends Component {
  state = {
    open: false,
    copied: false,
    pageForms: [],
    page: {},
    adAccount: null,
    pageform: null,
    displaySubscribeButton: false,
  };

  onSelectPage = async (event, data) => {
    const page = data.value;
    const pageId = page.id;
    const pageAccessToken = page.access_token;
    const pageForms = await Facebook.getPageFormsBy(pageId, pageAccessToken) || [];
    this.setState({
      page,
      pageForms,
      displaySubscribeButton: false,
    });
  };

  onSubscribe = async () => {
    const { page, pageForm, adAccount } = this.state;
    const subscribeToPage = await Facebook.subscribeToPageNotificationBy(page.id, page.access_token);
    if (subscribeToPage) {
      this.props.sendMessage(`Subscribed to '${page.name}'!`);
      // todo save integration to server
      this.props.subscribe(this.props.campaign.id, {
        deal_campaign_id: +this.props.campaign.id,
        page_name: page.name,
        form_name: pageForm.name,
        fb_page_id: +page.id,
        fb_form_id: +pageForm.id,
        fb_page_access_token: page.access_token,
        fb_ad_account_id: adAccount,
      });
    } else {
      this.props.sendMessage('Was not possible to subscribe!', true);
    }
  };

  onUnSubscribe = (integrationId) => {
    this.props.unsubscribe(this.props.campaign.id, integrationId);
  };

  onPageFormSelected = (event, data) => {
    this.setState({
      pageForm: data.value,
      displaySubscribeButton: true,
    });
  };

  componentDidMount() {
    disableAutoComplete();
  }

  render() {
    const { fbPages = [], fbIntegrations = [] } = this.props;
    const { page, pageForm, pageForms, displaySubscribeButton } = this.state;
    return (
      <Modal className='ApiIntegration tiny' open={this.props.open} onClose={this.props.onClose}>
        <Modal.Header>Facebook API Integration</Modal.Header>
        <Modal.Content>
            <p>Select the page and form you want to get the leads from and subscribe.</p>
          <div className='ac-pages'>
            {
              <Select placeholder='Select Page'
                      className='select-fb-page'
                      required={true}
                      options={fbPages || []}
                      onChange={this.onSelectPage}
              />
            }
            {
              pageForms && !!pageForms.length && <Select placeholder='Select Form'
                                                       className='select-fb-form'
                                                       options={pageForms || []}
                                                       onChange={this.onPageFormSelected}
              />
            }
            {
              displaySubscribeButton && <Button className='subscribe-fb-but' onClick={this.onSubscribe}>Subscribe</Button>
            }
          </div>
            <p>Edit your form subscriptions.</p>

          <Table celled compact definition>
            <Table.Header fullWidth>
              <Table.Row>
                <Table.HeaderCell>Page Name</Table.HeaderCell>
                <Table.HeaderCell>Form Name</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                fbIntegrations && fbIntegrations.map((integration, key) => <Table.Row key={`int-${key}`}>
                  <Table.Cell>{integration.page_name || integration.fb_page_id}</Table.Cell>
                  <Table.Cell>{integration.form_name || integration.fb_form_id}</Table.Cell>
                  <Table.Cell><Button onClick={this.onUnSubscribe.bind(this, integration.id)} >Unsubscribe</Button></Table.Cell>
                </Table.Row>)
              }
            </Table.Body>
          </Table>

        </Modal.Content>
        <Modal.Actions>
            <p className='help-note'>Need help? Browse through our <a href='https://convertlead.com/convertlead-integration/' target='__blank'>
                articles, tutorials and resources.
            </a></p>

          <Button color='black' onClick={this.props.onClose}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default compose(MessagesContainer)(FacebookIntegrationModal);