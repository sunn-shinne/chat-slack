/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { channelRemoved, channelAdded } from './channelsSlice.js';

const uiSlice = createSlice({
  name: 'feedback',
  initialState: {
    showConnectionError: false,
    currentChannelId: null,
  },
  reducers: {
    setShowConnectionError: (state) => {
      state.connectionError = !state.showConnectionError;
    },
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelRemoved, (state, action) => {
        if (action.payload === state.currentChannelId) {
          state.currentChannelId = 1;
        }
      })
      .addCase(channelAdded, (state, action) => {
        state.currentChannelId = action.payload.id;
      });
  },
});

export const { setCurrentChannel } = uiSlice.actions;
export default uiSlice.reducer;
