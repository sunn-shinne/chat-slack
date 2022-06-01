import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Main from './containers/Main.jsx';
import Login from './containers/Login.jsx';
import NotFound from './containers/NotFound.jsx';
import Navs from './components/Navs.jsx';

export default () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    const currentLocation = window.location.pathname;
    if (!isLoggedIn && currentLocation === '/') {
      window.location.replace('/login');
    }
    if (isLoggedIn && currentLocation === '/login') {
      window.location.replace('/');
    }
  }, [isLoggedIn]);

  const routes = isLoggedIn
    ? (
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    )
    : (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );

  return (
    <div className="d-flex flex-column h-100">
      <Navs />
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    </div>
  );
};
