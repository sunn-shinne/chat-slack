/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import routes from '../routes.js';
import i18next from '../i18n.js';

export const AuthContext = createContext({});

const AuthApiProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [isLoggedIn, setIsLoggedIn] = useState(!!user?.token);

  const showConnectionError = () => toast.error(i18next.t('errors.connection'));
  const getUsername = () => user.username;
  const getAuthHeader = () => (user?.token ? { Authorization: `Bearer ${user.token}` } : {});

  const authorizeUser = async (values, url) => {
    try {
      const { data } = await axios.post(url, values);
      const newUser = JSON.stringify(data);
      localStorage.setItem('user', newUser);
      window.location.replace(routes.mainPage());
      setIsLoggedIn(true);
    } catch (e) {
      setIsLoggedIn(false);
      if (e.code === 'ERR_BAD_REQUEST') {
        throw e;
      }
      showConnectionError();
    }
  };

  const loginUser = (values) => authorizeUser(values, routes.loginPath());
  const signupUser = (values) => authorizeUser(values, routes.signupPath());

  const logoutUser = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  const authApi = {
    isLoggedIn,
    loginUser,
    signupUser,
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
