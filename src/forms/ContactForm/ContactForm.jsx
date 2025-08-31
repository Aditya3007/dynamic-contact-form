import React from 'react'
import DynamicForm from '../../dynamic-form/components/DynamicForm/DynamicForm';
import { FormIdProvider } from '../../contexts/FormDataContext';
import validators from './utils/validators';
import valueFunctions from './utils/valueFunctions';
import { FieldValidatorProvider } from '../../contexts/FieldValidatorsContext';
import { FieldValueFunctionProvider } from '../../contexts/FieldValueFunctionContext';
import contactFormSchema from './contact_form_layout.json';

const ContactForm = () => {
  return (
    <FieldValidatorProvider validators={validators} >
      <FieldValueFunctionProvider valueFunctions={valueFunctions}>
        {/* In case of multiple contacts, which we will have, we can map and formId can be id of contact
            If we want to render other form which can have different value function and validator, we can follow the same architecture
        */}
        <FormIdProvider formId="1" formPath="contactForm">
            <DynamicForm schema={contactFormSchema} />
        </FormIdProvider>
      </FieldValueFunctionProvider>
    </FieldValidatorProvider>
  )
}

export default ContactForm;