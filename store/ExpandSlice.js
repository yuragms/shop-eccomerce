import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expandSidebar: true,
};

export const ExpandSlice = createSlice({
  name: 'expandSidebar',
  initialState,
  reducers: {
    toggleSidebar: {
      reducer: (state, action) => {
        state.expandSidebar = !state.expandSidebar;
      },
    },

    // toggleSidebar(state, action) {
    //   state.expandSidebar = !state.expandSidebar;
    // },
  },
});

export const { toggleSidebar } = ExpandSlice.actions;
export default ExpandSlice.reducer;
