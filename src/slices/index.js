import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import feedbackReducer from './feedbackSlice.js';
import messagesReducer from './messagesSlice.js';
import channelsReducer from './channelsSlice.js';

export default configureStore({
  reducer: {
    auth: authReducer,
    feedback: feedbackReducer,
    messages: messagesReducer,
    channels: channelsReducer,
  },
});
