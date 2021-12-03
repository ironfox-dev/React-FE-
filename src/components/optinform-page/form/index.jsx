import React from 'react';

import {
  Form,
  Input,
  Segment,
} from 'semantic-ui-react';

const OptinForm = ({ integrationForm, integrationFormFields, form, ...props }) => (
  <Form>
    <h1>{ integrationForm.header.title }</h1>
    {
      integrationFormFields.map((field, fieldIndex) => (
        field.isVisible
          ?  <Form.Field key={fieldIndex} required={field.isRequired}>
            <label>{ field.label }</label>
            <Input name={field.name}
                   value={form[field.name]}
                   placeholder={ field.placeholder }
                   onChange={props.onChange}
            />
          </Form.Field>
          : null
      ))
    }
    <Segment basic textAlign='right'>
      <Form.Button onClick={props.onSubmit}>{ integrationForm.button.name }</Form.Button>
    </Segment>
  </Form>
);

export default OptinForm;