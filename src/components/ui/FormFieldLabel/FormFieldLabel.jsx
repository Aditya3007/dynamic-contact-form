import React from 'react'
import styles from './FormFieldLabel.module.css'

const FormFieldLabel = ({name, required, label}) => {
  return (
    <div className={styles.formFieldLabel}>
        {required && <span>*</span>}
        <label htmlFor={name}>{label}</label>
    </div>
  )
}

export default FormFieldLabel