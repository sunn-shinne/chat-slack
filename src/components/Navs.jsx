import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';

const logout = () => {
  localStorage.removeItem('token');
  window.location.replace('/login');
};

const Navs = () => (
  <Navbar bg="white">
    <Container>
      <Navbar.Brand href="/">Chat Slack</Navbar.Brand>
      {
        localStorage.getItem('token')
          ? <Button variant="outline-primary" onClick={logout}>Выйти</Button>
          : null
      }
    </Container>
  </Navbar>
);

export default Navs;
