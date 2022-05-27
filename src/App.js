import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Chat from './containers/Chat.jsx';
import Login from './containers/Login.jsx';
import NotFound from './containers/NotFound.jsx';
import Navs from './components/Navs.jsx';

export default () => {
  const isLogin = !!localStorage.getItem('token');

  useEffect(() => {
    if (!isLogin && window.location.pathname !== '/login') {
      window.location.replace('/login');
    }
  }, []);

  return (
    <div className="d-flex flex-column h-100">
      <Navs />
      <BrowserRouter>
        {
          isLogin
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
            )
        }
      </BrowserRouter>
    </div>
  );
};
