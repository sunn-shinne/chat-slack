/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (values) => {
    const response = await axios.post(routes.loginPath(), values);
    return response.data;
  },
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  () => localStorage.removeItem('token'),
);

const initialState = {
  username: localStorage.getItem('username') ?? null,
  isLoggedIn: !!localStorage.getItem('token'),
};

const loginFormSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        const { token, username } = action.payload;
        localStorage.setItem('token', token);
        state.username = username;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.username = null;
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.username = null;
        state.isLoggedIn = false;
      });
  },
});

export default loginFormSlice.reducer;
