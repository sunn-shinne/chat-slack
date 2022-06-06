/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'feedback',
  initialState: {
    feedback: null,
    connectionError: false,
    currentChannelId: null,
    currentModalName: null,
  },
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
    setCurrentModalName: (state, action) => {
      state.currentModalName = action.payload;
    },
  },
});

const { reducer, actions } = uiSlice;
export const {
  setFeedback,
  clearFeedback,
  setConnectionError,
  setCurrentChannel,
  setCurrentModalName,
} = actions;
export default reducer;
