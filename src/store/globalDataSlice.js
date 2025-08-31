import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    countries: [
        { code: "+1", name: "USA", flag: "🇺🇸", cities: ['New York', 'Los Angeles', 'Chicago'], },
        { code: "+91", name: "India", flag: "🇮🇳", cities: ['New Delhi', 'Hyderabad', 'Pune'] },
        { code: "+44", name: "UK", flag: "🇬🇧", cities: ['Toronto', 'Vancouver', 'Montreal'] },
    ]
};

const globalPropsSlice = createSlice({
  name: 'globalProps',
  initialState,
  reducers: {
    updateGlobalProp: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});

export const { updateGlobalProp } = globalPropsSlice.actions;
export default globalPropsSlice.reducer;
