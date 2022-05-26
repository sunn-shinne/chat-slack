import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Chat from './containers/Chat.jsx';
import Login from './containers/Login.jsx';
import NotFound from './containers/NotFound.jsx';
import Navbar from './components/Navbar.jsx';

export default function App() {
  return (
    <div className="d-flex flex-column h-100">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}
