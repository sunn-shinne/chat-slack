import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Main from './components/Main.jsx';
import Login from './components/Auth/Login.jsx';
import NotFound from './components/NotFound.jsx';
import Navs from './components/Navs.jsx';
import useAuth from './hooks/useAuth.js';
import { setShowConnectionError } from './slices/uiSlice.js';
import useModal from './hooks/useModal.js';

export default () => {
  const { isLoggedIn } = useAuth();
  const { renderModal } = useModal();
  const { connectionError } = useSelector((state) => state.ui);

  const dispatch = useDispatch();

  useEffect(() => {
    if (connectionError) {
      toast.error('Ошибка соединения');
      dispatch(setShowConnectionError());
    }
  }, [connectionError]);

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
      <ToastContainer />
      {renderModal()}
    </div>
  );
};
