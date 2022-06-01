/* eslint-disable no-param-reassign */
import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

const axiosInstance = axios.create({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

export const addChannel = createAsyncThunk(
  'channels/addChannel',
  async (data) => {
    const response = await axiosInstance.post(routes.channelsPath(), data);
    return response.data;
  },
);

export const updateChannel = createAsyncThunk(
  'channels/updateChannel',
  async (id, data) => {
    const response = await axiosInstance.put(routes.channelPath(id), data);
    return response.data;
  },
);

export const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async (id) => {
    const response = await axiosInstance.delete(routes.channelPath(id));
    return response.data;
  },
);

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({ currentChannelId: null });

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, { payload }) => {
      const { entities, ids, currentChannelId } = payload;
      state.entities = entities;
      state.ids = ids;
      state.currentChannelId = currentChannelId;
    },
    setCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload.id;
    },
  },
});

export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const { setChannels, setCurrentChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
