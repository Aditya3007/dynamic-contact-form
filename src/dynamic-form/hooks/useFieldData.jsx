import { useFormData } from '../../contexts/FormDataContext';
import useFieldChangeHandler from './useFieldChnageHandler';
import useFieldValue from './useFieldValue';
import useConditionalFieldsData from './useConditionalFieldsData';

const useFieldData = ({ field }) => {
  const { type, name, __conditions, validationFn, ...rest } = field;

  const {formId, formPath} = useFormData();
  const {value, messages} = useFieldValue(name, formId, formPath);
  const onChange = useFieldChangeHandler(formId, formPath, name, validationFn);
  const conditionalFieldData = useConditionalFieldsData(__conditions, formId, formPath);

  if (new Set(['field-group', 'section']).has(type)) {
    return { ...field };
  }

  return {
    name,
    type,
    value,
    messages,
    onChange,
    ...rest,
    ...(__conditions ? conditionalFieldData : {})
  };
};

export default useFieldData;
