/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import signupImg from '../../../assets/signupImg.js';
import SignupForm from './SignupForm.jsx';

const Signup = () => (
  <div className="container-fluid h-100">
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
            <div>
              <img
                alt="Войти"
                className="rounded-circle"
                src={signupImg}
              />
            </div>
            <SignupForm layoutClass="w-50" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Signup;
