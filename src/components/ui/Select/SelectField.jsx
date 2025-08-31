import React from 'react'
import styles from './SelectField.module.css'
import FormFieldLabel from '../FormFieldLabel/FormFieldLabel'
import FormFieldMessages from '../FormFieldMessages/FormFieldMessages'

const SelectField = ({name, label, onChange, items, placeHolder = '', required, value, messages=[]}) => {
  return (
    <div className={styles.fieldContainer}>
        <FormFieldLabel name={name} label={label} required={required} />
        <select id={name} name={name} onChange={(e) => onChange(e.target.value)} value={value}>
            <option value="">{placeHolder}</option>
            {items.map((item, index) => (
                <option key={index} value={item}>{item}</option>
            ))}
        </select>
        <FormFieldMessages messages={messages} />
    </div>
  )
}

export default SelectField