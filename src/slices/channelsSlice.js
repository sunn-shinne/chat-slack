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
    addChannel: channelsAdapter.addOne,
  },
});

export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const { setChannels, setCurrentChannel, addChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
