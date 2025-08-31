import React from 'react'
import styles from './TextField.module.css'
import FormFieldLabel from '../FormFieldLabel/FormFieldLabel'
import FormFieldMessages from '../FormFieldMessages/FormFieldMessages'

const TextField = ({name, label, type, onChange, value, required, messages=[]}) => {
  return (
    <div className={styles.fieldContainer}>
        <FormFieldLabel name={name} label={label} required={required} />
        <input id={name} name={name} type={type} onChange={(e) => onChange(e.target.value)} value={value}/>
        <FormFieldMessages messages={messages} />
    </div>
  )
}

export default TextField