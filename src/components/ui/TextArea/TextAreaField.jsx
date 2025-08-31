import React from 'react'
import styles from './TextAreaField.module.css'
import FormFieldLabel from '../FormFieldLabel/FormFieldLabel'
import FormFieldMessages from '../FormFieldMessages/FormFieldMessages'

const TextAreaField = ({name, label, type, onChange, value, required, messages=[]}) => {
  return (
    <div className={styles.fieldContainer}>
        <FormFieldLabel name={name} label={label} required={required} />
        <textarea id={name} name={name} type={type} onChange={(e) => onChange(e.target.value)} value={value}/>
        <FormFieldMessages messages={messages} />
    </div>
  )
}

export default TextAreaField;