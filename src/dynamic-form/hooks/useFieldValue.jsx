import { useSelector, shallowEqual } from 'react-redux';

const useFieldValue = (name, formId, formPath) => {
  return useSelector(
    (state) => state?.formData?.[formPath]?.[formId]?.[name] || {},
    shallowEqual
  );
};

export default useFieldValue;
