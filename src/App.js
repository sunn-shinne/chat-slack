import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Chat from './containers/Chat.jsx';
import Login from './containers/Login.jsx';
import NotFound from './containers/NotFound.jsx';
import Navs from './components/Navs.jsx';
import AuthContext from './contexts/AuthContext.js';

export default () => {
  const [isAuthorized, setIsAuthrized] = useState(!!localStorage.getItem('token'));

  const loginUser = (token) => {
    setIsAuthrized(true);
    localStorage.setItem('token', token);
    window.location.replace('/');
  };

  const logoutUser = () => {
    setIsAuthrized(false);
    localStorage.removeItem('token');
    window.location.replace('/login');
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const authContextValue = { loginUser, logoutUser, isAuthorized };

  useEffect(() => {
    if (!isAuthorized && window.location.pathname !== '/login') {
      window.location.replace('/login');
    }
  }, []);

  const routes = isAuthorized
    ? (
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    )
    : (
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );

  return (
    <AuthContext.Provider value={authContextValue}>
      <div className="d-flex flex-column h-100">
        <Navs />
        <BrowserRouter>
          {routes}
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
};
