/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useTranslation } from 'react-i18next';
import loginImg from '../../../assets/loginImg.js';
import LoginForm from './LoginForm.jsx';

const Login = () => {
  const { t } = useTranslation();
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  alt="Войти"
                  className="rounded-circle"
                  src={loginImg}
                />
              </div>
              <LoginForm layoutClass="col-12 col-md-6 mt-3 mt-mb-0" />
            </div>
            <div className="card-footer text-center">
              <p className="m-3">
                {t('have_no_account')}
                &nbsp;
                <a href="/signup">{t('signup')}</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
