import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Main from './components/Main.jsx';
import Login from './components/Auth/Login.jsx';
import Signup from './components/Auth/Signup.jsx';
import NotFound from './components/NotFound.jsx';
import Navs from './components/Navs.jsx';
import useAuth from './hooks/useAuth.js';
import useModal from './hooks/useModal.js';

export default () => {
  const { isLoggedIn } = useAuth();
  const { renderModal } = useModal();

  useEffect(() => {
    const currentLocation = window.location.pathname;
    if (!isLoggedIn && currentLocation === '/') {
      window.location.replace('/login');
    }
    if (isLoggedIn && (currentLocation === '/login' || currentLocation === '/signup')) {
      window.location.replace('/');
    }
  }, [isLoggedIn]);

  const routes = isLoggedIn
    ? (
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    )
    : (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );

  return (
    <div className="d-flex flex-column h-100">
      <Navs />
      <BrowserRouter>
        {routes}
      </BrowserRouter>
      <ToastContainer />
      {renderModal()}
    </div>
  );
};
