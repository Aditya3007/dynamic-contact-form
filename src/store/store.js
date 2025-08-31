import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import globalPropsReducer from './globalDataSlice'

const store = configureStore({
  reducer: {
    formData: formReducer,
    globalProps: globalPropsReducer
  },
});

export default store;
