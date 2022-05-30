/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'message',
  initialState: { message: null },
  reducers: {
    setMessage: (state, action) => {
      console.log(action);
      state.message = action.payload;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
});

const { reducer, actions } = messageSlice;
export const { setMessage, clearMessage } = actions;
export default reducer;
