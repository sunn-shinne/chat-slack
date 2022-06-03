/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'feedback',
  initialState: { feedback: null, connectionError: false, currentChannelId: null },
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
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
});

const { reducer, actions } = uiSlice;
export const {
  setFeedback,
  clearFeedback,
  setConnectionError,
  setCurrentChannel,
} = actions;
export default reducer;
