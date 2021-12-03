import React from "react";
import { Form, Input } from "semantic-ui-react";
import CopyText from "react-copy-text";
import ReactJson from "react-json-view";
import RequestLeadSchema from "./schemas/reques-lead";
import ResponseLeadSchema from "./schemas/response-lead";
import {disableAutoComplete} from '../../../../../utils';

class WebHook extends React.Component {
  state = {
    copied: false
  };

  onCopy = () => {
    this.setState({copied: true, value: this.props.campaignLink});
    setTimeout(() => {
      this.setState({
        copied: false,
        value: '',
      })
    }, 400)
  };

  componentDidMount() {
    disableAutoComplete();
  }

  render () {
    return (<Form>
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
      <Form.Field>
        <h2>Body</h2>
        <ReactJson name="Body" collapsed={false} src={RequestLeadSchema}/>
      </Form.Field>
      <Form.Field>
        <h2>Response</h2>
        <ReactJson collapsed={true} name='Lead' src={ResponseLeadSchema} />
      </Form.Field>
    </Form>);
  };
};

export default WebHook;