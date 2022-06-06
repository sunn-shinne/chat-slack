/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'feedback',
  initialState: {
    feedback: null,
    showConnectionError: false,
    currentChannelId: null,
    currentModalName: null,
  },
  reducers: {
    setShowConnectionError: (state) => {
      state.connectionError = !state.showConnectionError;
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
  setShowConnectionError,
  setCurrentChannel,
  setCurrentModalName,
} = actions;
export default reducer;
