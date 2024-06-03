import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  show: true,
  header: 'Error creating product',
  msgs: [
    {
      msg: 'Choose at least 2 images.',
      type: 'error',
    },
    {
      msg: 'Choose at least 2 images.',
      type: 'success',
    },
  ],
  link: {
    link: '',
    link_text: '',
  },
};

export const DialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    // showDialog(state, action) {
    //   state.show = true;
    //   state.header = action.payload.header;
    //   state.msgs = action.payload.msgs;
    //   state.link = action.payload.link;
    // },
    // hideDialog(state, action) {
    //   state.show = false;
    //   state.header = '';
    //   state.msgs = [];
    //   state.link = {};
    // },
    showDialog: {
      reducer: (state, action) => {
        state.show = true;
        state.header = action.payload.header;
        state.msgs = action.payload.msgs;
        state.link = action.payload.link;
      },
    },
    hideDialog: {
      reducer: (state, action) => {
        state.show = false;
        state.header = '';
        state.msgs = [];
        state.link = {};
      },
    },
  },
});

export const { showDialog, hideDialog } = DialogSlice.actions;

export default DialogSlice.reducer;
