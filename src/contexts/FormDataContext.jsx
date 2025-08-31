// contexts/FormDataContext.js
import { createContext, useContext } from "react";

export const FormDataContext = createContext(null);

export const FormIdProvider = ({ children, formId, formPath }) => (
  <FormDataContext.Provider value={{formId, formPath}}>
    {children}
  </FormDataContext.Provider>
);

export const useFormData = () => useContext(FormDataContext);