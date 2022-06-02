/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'feedback',
  initialState: { feedback: null, connectionError: false },
  reducers: {
    setFeedback: (state, action) => {
      state.feedback = action.payload;
    },
    clearFeedback: (state) => {
      state.feedback = null;
    },
    setConnectionError: (state) => {
      state.connectionError = !state.connectionError;
    },
  },
});

const { reducer, actions } = uiSlice;
export const {
  setFeedback,
  clearFeedback,
  setConnectionError,
} = actions;
export default reducer;
