import React from 'react';
import useFieldValue from './useFieldValue';
import { useFieldValueFunctions } from '../../contexts/FieldValueFunctionContext';
import useGlobalProps from '../../hooks/useGlobalProps';

const useConditionalFieldData = (condition, formId, formPath) => {
  const { dependsOn = [], useGlobalProps: hasGlobalProps = false, valueFn } = condition;
  const valueFunctions = useFieldValueFunctions();
  const dependentValues = dependsOn.map((fieldName) => useFieldValue(fieldName, formId, formPath)?.value);
  const globalProps =  useGlobalProps();

  const fnProps = hasGlobalProps ? [...dependentValues, globalProps] : dependentValues;

  if (!valueFn || !valueFunctions[valueFn]) return null;

  return valueFunctions[valueFn](...fnProps);
};

const useConditionalFieldsData = (conditionObject = {}, formId, formPath) => {
  const keys = Object.keys(conditionObject);

  const results = {}

  keys.forEach((fieldName) => {
    results[fieldName] = useConditionalFieldData(conditionObject[fieldName], formId, formPath);
  })

  return results;
};

export default useConditionalFieldsData;
