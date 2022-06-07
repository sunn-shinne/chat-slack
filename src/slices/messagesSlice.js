/* eslint-disable no-param-reassign */
import {
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { channelRemoved } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState({ loading: 'idle', error: null });

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, { payload }) => {
      const { entities, ids } = payload;
      state.entities = entities;
      state.ids = ids;
    },
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(channelRemoved, (state, action) => {
      const channelId = action.payload;
      const restMessages = Object
        .values(state.entities)
        .filter((item) => item.channelId !== channelId);
      messagesAdapter.setAll(state, restMessages);
    });
  },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const { setMessages, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
