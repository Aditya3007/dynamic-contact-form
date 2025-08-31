import { useDispatch } from "react-redux";
import { updateField } from "../../store/formSlice";
import { useCallback } from "react";
import { useFieldValidators } from "../../contexts/FieldValidatorsContext";

const useFieldChangeHandler = (formId, formPath, name, validationFn) => {
  const dispatch = useDispatch();

  const validators = useFieldValidators();

  return useCallback(
      (val) => {
          if(!validationFn || !validators[validationFn]) {
            dispatch(updateField({formPath, formId, key: name, value: {value: val}}));
            return;
          }
          const validationMsg = validators[validationFn](val);
          if(validationMsg) {
              dispatch(updateField({formPath, formId, key: name, value: {value: val, messages: [{type: 'error', text: validationMsg}]}}));
          } else {
              dispatch(updateField({formPath, formId, key: name, value: {value: val}}));
          }
      },
      [dispatch, validationFn, formId, name, validators, formPath]
    );

};

export default useFieldChangeHandler;
