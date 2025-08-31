import React from 'react'
import FormComponentFactory from '../../../dynamic-form/components/FormComponentFactory/FormComponentFactory';
import styles from './FieldGroup.module.css';

const FieldGroup = ({children}) => {
  return (
    <div className={styles.fieldGroupContainer}>
        {children}
    </div>
  )
}

export default FieldGroup