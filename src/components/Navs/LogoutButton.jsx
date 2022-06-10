import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth.js';

const LogoutButton = () => {
  const { t } = useTranslation();
  const { isLoggedIn, logoutUser } = useAuth();

  return (
    isLoggedIn
      ? <Button variant="outline-primary" onClick={logoutUser}>{t('navs.logout')}</Button>
      : null
  );
};

export default LogoutButton;
