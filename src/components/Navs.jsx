import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../slices/authSlice.js';

const Navs = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = () => dispatch(logoutUser());

  return (
    <Navbar bg="white">
      <Container>
        <Navbar.Brand href="/">Chat Slack</Navbar.Brand>
        {isLoggedIn && <Button variant="outline-primary" onClick={handleLogout}>Выйти</Button>}
      </Container>
    </Navbar>
  );
};

export default Navs;
