/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: { feedback: null },
  reducers: {
    setFeedback: (state, action) => {
      state.feedback = action.payload;
    },
    clearFeedback: (state) => {
      state.feedback = null;
    },
  },
});

const { reducer, actions } = feedbackSlice;
export const { setFeedback, clearFeedback } = actions;
export default reducer;
