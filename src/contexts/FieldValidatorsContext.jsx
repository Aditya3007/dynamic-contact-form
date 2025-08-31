// contexts/FormDataContext.js
import { createContext, useContext } from "react";

export const FieldValidatorsContext = createContext(null);

export const FieldValidatorProvider = ({ children, validators }) => (
  <FieldValidatorsContext.Provider value={validators}>
    {children}
  </FieldValidatorsContext.Provider>
);

export const useFieldValidators = () => useContext(FieldValidatorsContext);