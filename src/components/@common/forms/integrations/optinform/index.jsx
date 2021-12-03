import React, {Component} from 'react';

import {
    Form,
    Input, Checkbox
} from 'semantic-ui-react';
import CopyText from 'react-copy-text';
import {disableAutoComplete} from '../../../../../utils';

class OptInForm extends Component {
    state = {
        value: '',
        copied: false,
    };
    onChange = (field, order, event, data) => {
        const fieldData = {
            [data.name]: (data.hasOwnProperty('checked') ? data.checked : data.value),
        };

        if (order !== undefined) {
            fieldData[order] = order;
        }

        this.props.changeOptinForm(field, fieldData);
    };

    onCopy = () => {
        this.setState({copied: true, value: `<iframe src="${this.props.optinFormLink}"></iframe>`});
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

    render() {
        const {integrationForm} = this.props.form;
        return (
            <div>
                <Form size='big'>
                    <Form.Field>
                        <label>Form Link</label>
                        <CopyText text={this.state.value} onCopied={this.onCopied}/>
                        <Input
                          action={{
                                color: 'teal',
                                labelPosition: 'right',
                                icon: 'copy',
                                content: `${(this.state.copied ? 'Copied' : 'Copy')}`, onClick: this.onCopy
                            }}
                            defaultValue={`<iframe src="${this.props.optinFormLink}"></iframe>`}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Form Title</label>
                        <Input placeholder='Form Title'
                               name='title'
                               value={integrationForm.header.title}
                               onChange={this.onChange.bind(this, 'header', 0)}/>
                    </Form.Field>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>Name Label</label>
                            <Input placeholder='Fullname label'
                                   value={integrationForm.fullname.label}
                                   name='label'
                                   onChange={this.onChange.bind(this, 'fullname', 1)}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Palceholder</label>
                            <Input placeholder='Fullname Placeholder'
                                   name='placeholder'
                                   value={integrationForm.fullname.placeholder}
                                   onChange={this.onChange.bind(this, 'fullname', 1)}/>
                        </Form.Field>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field control={Checkbox}
                                    name='isRequired'
                                    checked={integrationForm.fullname.isRequired}
                                    onChange={this.onChange.bind(this, 'fullname', 1)}
                                    label={<label>Name Is required</label>}
                        />
                        <Form.Field control={Checkbox}
                                    name='isVisible'
                                    checked={integrationForm.fullname.isVisible}
                                    onChange={this.onChange.bind(this, 'fullname', 1)}
                                    label={<label>Name Is visible</label>}
                        />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>E-mail Label</label>
                            <Input placeholder='Email Label'
                                   name='label'
                                   value={integrationForm.email.label}
                                   onChange={this.onChange.bind(this, 'email', 2)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>E-mail Placeholder</label>
                            <Input placeholder='Email Placeholder'
                                   name='placeholder'
                                   value={integrationForm.email.placeholder}
                                   onChange={this.onChange.bind(this, 'email', 2)}
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field control={Checkbox}
                                    name='isRequired'
                                    checked={integrationForm.email.isRequired}
                                    onChange={this.onChange.bind(this, 'email', 2)}
                                    label={<label>Email Is required</label>}
                        />
                        <Form.Field control={Checkbox}
                                    name='isVisible'
                                    checked={integrationForm.email.isVisible}
                                    onChange={this.onChange.bind(this, 'email', 2)}
                                    label={<label>Email Is visible</label>}
                        />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>Phone Label</label>
                            <Input placeholder='Phone Label'
                                   name='label'
                                   value={integrationForm.phone.label}
                                   onChange={this.onChange.bind(this, 'phone', 3)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Placeholder</label>
                            <Input placeholder='Phone Placeholder'
                                   name='placeholder'
                                   value={integrationForm.phone.placeholder}
                                   onChange={this.onChange.bind(this, 'phone', 3)}
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field control={Checkbox}
                                    name='isRequired'
                                    checked={integrationForm.phone.isRequired}
                                    onChange={this.onChange.bind(this, 'phone', 3)}
                                    label={<label>Phone Is required</label>}
                        />
                        <Form.Field control={Checkbox}
                                    name='isVisible'
                                    checked={integrationForm.phone.isVisible}
                                    onChange={this.onChange.bind(this, 'phone', 3)}
                                    label={<label>Phone Is visible</label>}
                        />
                    </Form.Group>
                    <Form.Field>
                        <label>Button Subscribe</label>
                        <Input placeholder='Button Subscribe'
                               name='name'
                               value={integrationForm.button.name}
                               onChange={this.onChange.bind(this, 'button', 0)}
                        />
                    </Form.Field>
                </Form>
            </div>
        );
    }
}

export default OptInForm;