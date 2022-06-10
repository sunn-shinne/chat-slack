import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Main from './Main.jsx';
import Login from './Auth/Login.jsx';
import Signup from './Auth/Signup.jsx';
import NotFound from './NotFound.jsx';
import Navs from './Navs.jsx';
import useAuth from '../hooks/useAuth.js';
import useModal from '../hooks/useModal.js';
import routes from '../routes.js';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  return (
    isLoggedIn ? children : <Navigate replace to={routes.loginPage()} state={{ from: location }} />
  );
};

const App = () => {
  const { renderModal } = useModal();

  return (
    <div className="d-flex flex-column h-100">
      <BrowserRouter>
        <Navs />
        <Routes>
          <Route path={routes.mainPage()} element={<PrivateRoute><Main /></PrivateRoute>} />
          <Route path={routes.loginPage()} element={<Login />} />
          <Route path={routes.signupPage()} element={<Signup />} />
          <Route path={routes.notFoundPage()} element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
      {renderModal()}
    </div>
  );
};

export default App;
