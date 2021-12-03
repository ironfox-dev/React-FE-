import React, {Component} from 'react';
import {compose} from "recompose";
import {
    CompaniesContainer, LeadFormContainer, LeadsContainer, MessagesContainer, BreadCrumbContainer,ProfileContainer
} from "@containers";
import {Button, Segment} from 'semantic-ui-react';
import LeadForm from "components/@common/forms/lead";
import * as R from "ramda";

class CreateLead extends Component {
    componentWillMount() {
        this.props.loadForm({});
        this.props.loadSelectBoxCompanies();
        this.props.addBreadCrumb({
            name: 'Leads',
            path: '/companies/leads/all'
        }, true);
        this.props.addBreadCrumb({
            name: 'Create',
            path: '',
            active: true,
        }, false);
    }

    onSave = () => {
        if (this.validate()) {
            this.props.saveForm(this.props.form);
        }
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

    render() {
        return (
            <Segment basic>
                <div className="create-lead-header">
                    <h1 className="ui left floated header mobile-app-menu">Create lead</h1>
                </div>
                <div className="create-lead-form">
                    <LeadForm {...this.props} />
                    <div>
                        <Button onClick={this.onSave}>Save</Button>
                    </div>
                </div>
            </Segment>
        )
    }
}

export default compose(
    BreadCrumbContainer,
    ProfileContainer,
    LeadFormContainer,
    LeadsContainer,
    MessagesContainer,
    CompaniesContainer
)(CreateLead);