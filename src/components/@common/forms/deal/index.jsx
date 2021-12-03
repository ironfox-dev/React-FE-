import React, { Component } from 'react';
import {
  Form,
  Input,
  label,
  Select,
} from 'semantic-ui-react';
import './index.scss';
import {Auth} from "@services";

class DealForm extends Component {
  state = {};
  onChangeName = (event, data) => {
    this.props.changeForm({ name: data.value });
    if (Auth.isCompany && this.props.selectBoxAgencies.length === 1) {
      this.onChangeAgency(event, { value: this.props.selectBoxAgencies[0].value });
    }
  };

  componentDidMount() {
    this.props.loadSelectBoxTimezones();
  }

  onChangeCompany = (event, data) => {
    this.props.changeForm({ companyId: data.value });
    this.props.loadSelectBoxCompanies('');
  };

  onChangeTimezone = (event, data) => {
    this.props.changeForm({ timezone: data.value });
  };

  onChangeAgency = (event, data) => {
    this.props.changeForm({ agency_company_id: data.value });
  };

  onSearchChange = event => {
    this.props.loadSelectBoxCompanies(event.target.value);
  };

  onSearchTimezone = event => {
    this.props.loadSelectBoxTimezones(event.target.value);
  };

  render() {
    const { name } = this.props.form;
    return (<Form size='big' className='dealForm'>
      <Form.Field required>
        <label>Name</label>
        <Form.Field control={Input} placeholder='Campaign name' value={name} onChange={this.onChangeName} />
      </Form.Field>
      {
        Auth.isAgency ?
          <Form.Field
            control={Select}
            options={this.props.selectBoxCompanies || []}
            label={{ children: 'Company', htmlFor: 'deal-form-companies-list' }}
            placeholder='Select company'
            search
            defaultValue={this.props.form.companyId || null}
            onChange={this.onChangeCompany}
            onSearchChange={this.onSearchChange}
            searchInput={{ id: 'deal-form-companies-list' }}
          />
          : null
      }
      {
        Auth.isCompany && this.props.selectBoxAgencies && this.props.selectBoxAgencies.length > 1 ?
          <Form.Field
            control={Select}
            options={this.props.selectBoxAgencies || []}
            label={{ children: 'Agency', htmlFor: 'deal-form-agencies-list' }}
            placeholder='Select Agency'
            search
            defaultValue={this.props.form.agency_company_id || null}
            onChange={this.onChangeAgency}
            searchInput={{ id: 'deal-form-agencies-list' }}
          />
          : null
      }

    </Form>)
  }
}

export default DealForm;
