/* eslint-disable no-param-reassign */
import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

const axiosInstance = axios.create({
  headers: { Authorization: localStorage.getItem('token') },
});

export const addMessage = createAsyncThunk(
  'messages/addMessage',
  async (id, data) => {
    const response = await axiosInstance.post(routes.channelMessagesPath(id), data);
    return response.data;
  },
);

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
  },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const { setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
