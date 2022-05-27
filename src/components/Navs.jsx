import React, { useContext } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import AuthContext from '../contexts/AuthContext.js';

const Navs = () => {
  const { isAuthorized, logoutUser } = useContext(AuthContext);
  return (
    <Navbar bg="white">
      <Container>
        <Navbar.Brand href="/">Chat Slack</Navbar.Brand>
        {isAuthorized && <Button variant="outline-primary" onClick={logoutUser}>Выйти</Button>}
      </Container>
    </Navbar>
  );
};

export default Navs;
