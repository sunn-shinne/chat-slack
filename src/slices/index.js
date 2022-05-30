import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import messageReducer from './messageSlice.js';

export default configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
  },
});
