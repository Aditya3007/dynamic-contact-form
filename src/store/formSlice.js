import { createSlice } from '@reduxjs/toolkit';

const initialState = {
};

const formSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { key, value, formId, formPath } = action.payload;
      if(!state[formPath]){
        state[formPath] = {};
      }
      if(!state[formPath][formId]){
        state[formPath][formId] = {};
      }
      state[formPath][formId][key] = value;
    },
  },
});

export const { updateField } = formSlice.actions;
export default formSlice.reducer;
