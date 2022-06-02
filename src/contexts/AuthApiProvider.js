/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState } from 'react';
import axios from 'axios';

import routes from '../routes.js';

export const AuthContext = createContext({});

const AuthApiProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [isLoggedIn, setIsLoggedIn] = useState(user && user.token);

  const loginUser = async (values) => {
    try {
      const { data } = await axios.post(routes.loginPath(), values);
      const newUser = JSON.stringify(data);
      localStorage.setItem('user', newUser);
      setIsLoggedIn(true);
    } catch (e) {
      setIsLoggedIn(false);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  const getAuthHeader = () => (
    user && user.token
      ? { Authorization: `Bearer ${user.token}` }
      : {});

  const getUsername = () => user.username;

  const authApi = {
    isLoggedIn,
    loginUser,
    logoutUser,
    getAuthHeader,
    getUsername,
  };

  return (
    <AuthContext.Provider value={authApi}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthApiProvider;
