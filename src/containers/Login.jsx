/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import loginImg from '../../assets/loginImg.js';
import LoginForm from '../components/LoginForm.jsx';

const Login = () => (
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
              Нет аккаунта?&nbsp;
              <a href="/">Регистрация</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Login;
