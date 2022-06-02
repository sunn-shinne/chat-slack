/* eslint-disable no-param-reassign */
import {
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';

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
});

export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const { setMessages, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
