import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import LangToggleButton from './LangToggleButton.jsx';
import LogoutButton from './LogoutButton.jsx';
import BrandLink from './BrandLink.jsx';

const Navs = () => (
  <Navbar bg="white">
    <Container>
      <BrandLink />
      <Navbar.Collapse className="justify-content-end">
        <LogoutButton />
        <LangToggleButton />
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Navs;
