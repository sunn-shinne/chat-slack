/* eslint-disable no-param-reassign */
import {
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState();

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, { payload }) => {
      const { entities, ids } = payload;
      state.entities = entities;
      state.ids = ids;
    },
    channelAdded: channelsAdapter.addOne,
    channelUpdated: channelsAdapter.updateOne,
    channelRemoved: channelsAdapter.removeOne,
  },
});

export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const {
  setChannels,
  setCurrentChannel,
  channelAdded,
  channelUpdated,
  channelRemoved,
} = channelsSlice.actions;
export default channelsSlice.reducer;
