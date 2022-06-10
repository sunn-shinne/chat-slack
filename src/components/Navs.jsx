import React from 'react';
import {
  Navbar,
  Container,
  Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth.js';
import routes from '../routes.js';

const Navs = () => {
  const { t } = useTranslation();
  const { isLoggedIn, logoutUser } = useAuth();

  return (
    <Navbar bg="white">
      <Container>
        <Navbar.Brand as={Link} to={routes.mainPage()}>
          {t('navs.brand')}
        </Navbar.Brand>
        {isLoggedIn && <Button variant="outline-primary" onClick={logoutUser}>{t('navs.logout')}</Button>}
      </Container>
    </Navbar>
  );
};

export default Navs;
