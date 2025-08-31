import React from 'react'
import styles from './DynamicForm.module.css';
import FormComponentFactory from '../FormComponentFactory/FormComponentFactory';
import { useFormData } from '../../../contexts/FormDataContext';

const DynamicForm = ({schema}) => {

  const {formId, formPath} = useFormData();
  const {title, description, layout} = schema;
  return (
    <div className={styles.formContainer}>
        <h1>{title}</h1>
        <p>{description}</p>
        <div className={styles.formSections}>
            {layout.map((item) => <FormComponentFactory key={`${formPath}-${formId}-${item?.name}`} {...item} />)}
        </div>
    </div>
  )
}

export default DynamicForm;