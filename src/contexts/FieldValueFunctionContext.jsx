// contexts/FormDataContext.js
import { createContext, useContext } from "react";

export const FieldValueFunctionContext = createContext(null);

export const FieldValueFunctionProvider = ({ children, valueFunctions }) => (
  <FieldValueFunctionContext.Provider value={valueFunctions}>
    {children}
  </FieldValueFunctionContext.Provider>
);

export const useFieldValueFunctions = () => useContext(FieldValueFunctionContext);