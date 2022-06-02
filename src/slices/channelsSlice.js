/* eslint-disable no-param-reassign */
import {
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';

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
