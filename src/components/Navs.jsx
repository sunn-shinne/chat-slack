import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth.js';

const Navs = () => {
  const { t } = useTranslation();
  const { isLoggedIn, logoutUser } = useAuth();
  const handleLogout = () => logoutUser();

  return (
    <Navbar bg="white">
      <Container>
        <Navbar.Brand href="/">{t('navs.brand')}</Navbar.Brand>
        {isLoggedIn && <Button variant="outline-primary" onClick={handleLogout}>{t('navs.logout')}</Button>}
      </Container>
    </Navbar>
  );
};

export default Navs;
