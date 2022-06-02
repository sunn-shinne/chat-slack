import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import useAuth from '../hooks/useAuth.js';

const Navs = () => {
  const { isLoggedIn, logoutUser } = useAuth();
  const handleLogout = () => logoutUser();

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
