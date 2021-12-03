import React, { Component } from 'react'
import {Button, Form, Input, Modal} from 'semantic-ui-react'
import './index.scss';
import CopyText from "react-copy-text";
import {disableAutoComplete} from '../../../../../utils';

class ClickFunnelsIntegrationModal extends Component {
  state = {
    open: false,
  };

  componentDidMount() {
    disableAutoComplete();
  }

  render() {
    return (
      <Modal className='ApiIntegration tiny' open={this.props.open} onClose={this.props.onClose}>
        <Modal.Header>ClickFunnels API Integration</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <h2>Campaign Link</h2>
              <CopyText text={this.state.value}  />
              <Input
                action={{
                  color: 'teal',
                  labelPosition: 'right',
                  icon: 'copy',
                  content: `${(this.state.copied ? 'Copied' : 'Copy')}`, onClick: this.onCopy }}
                defaultValue={this.props.campaignLink}
              />
            </Form.Field>
          </Form>
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

export default ClickFunnelsIntegrationModal