import React, {Component} from 'react';
import { compose } from 'recompose'
import * as R from 'ramda';

import {
    Modal,
    Button, Icon,
} from 'semantic-ui-react';

import './index.scss';
import { MessagesContainer } from '@containers';

class EntityModal extends Component {
    state = {
        formSaved: false,
    };

    onSave = () => {
        if (this.state.formSaved && !this.props.error) {
            return;
        }

        if (this.validate()) {
            this.setState({
                formSaved: true,
            });
            this.props.saveForm(this.props.form);
        }
    };

    onDelete = () => {
        if (typeof this.props.deleteRecord === 'function') {
            this.props.deleteRecord(this.props.form);
        }
    };

    onCancel = () => {
        this.props.loadForm({show: false});
    };

    validate = () => {
        if (R.has('required', this.props)) {
            const requiredFields = R.mapObjIndexed((value, fieldName) => {
                if (!this.props.form[fieldName] && value) {
                    return {
                        field: fieldName,
                        required: true,
                    }
                }
                return {
                    required: false
                }
            }, this.props.required) || [];

            const fields = R.reduce((acc, value) => {
                return `${(acc ? acc + ',\n' + value.field : value.field)}`
            }, '', R.filter(field => field.required, R.values(requiredFields)));
            if (fields) {
                this.props.sendMessage(`Missing required "${fields}"!`, true);
                return false;
            }
        }
        return true;
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.error !== this.props.error) {
            this.setState({
                formSaved: false,
            })
        }
    }

    render() {
        const { Container, displayDeleteButton, ...rest } = this.props;
        const { formSaved } = this.state;

        if (!this.props.form.show && formSaved) {
            this.setState({
                formSaved: false,
            })
        }

        return (
            <Modal className='freshAppEntityModal'
                   open={this.props.form.show}
                   centered={false}
                   size={rest.size || 'tiny'}
                   onClose={this.props.loadForm.bind(this, {show: false})}>
                <Modal.Header>{this.props.form.title}</Modal.Header>
                <Modal.Content>
                    <Container {...rest} />
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={this.onCancel}>
                        Cancel
                    </Button>
                    <Button
                        color={(this.props.error || !formSaved ? 'teal' : 'grey')}
                        labelPosition="left"
                        content="Save"
                        onClick={this.onSave}
                    />
                    {
                        displayDeleteButton && (
                          <a
                            className="deleteButton"
                            onClick={this.onDelete}
                          >
                              <Icon name="trash alternate" />
                          </a>
                        )
                    }
                </Modal.Actions>
            </Modal>
        )
    }
}

export default compose(MessagesContainer)(EntityModal);
