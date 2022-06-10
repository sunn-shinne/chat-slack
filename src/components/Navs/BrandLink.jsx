import React from 'react';
import { Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import routes from '../../routes.js';

const BrandLink = () => {
  const { t } = useTranslation();

  return (
    <Navbar.Brand as={Link} to={routes.mainPage()}>
      {t('navs.brand')}
    </Navbar.Brand>
  );
};

export default BrandLink;
