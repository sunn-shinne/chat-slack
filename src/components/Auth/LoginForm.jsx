import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import cn from 'classnames';
import useAuth from '../../hooks/useAuth.js';

const LoginForm = ({ layoutClass }) => {
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const { loginUser } = useAuth();

  const handleLogin = async (formValue) => {
    try {
      setIsValid(true);
      await loginUser(formValue);
    } catch (e) {
      console.log(e.code);
      setIsValid(false);
      setErrorMessage('Неверные имя пользователя или пароль');
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: handleLogin,
  });

  const usernameClass = cn('form-control', !isValid && 'is-invalid');
  const passwordClass = cn('form-control', !isValid && 'is-invalid');

  return (
    <Form className={layoutClass} onSubmit={formik.handleSubmit} autoComplete="off">
      <h1 className="text-center mb-4">Войти</h1>

      <Form.Group className="mb-3" controlId="formUsername">
        <Form.FloatingLabel label="Ваш ник">
          <Form.Control
            id="username"
            type="username"
            placeholder="Ваш ник"
            required
            className={usernameClass}
            value={formik.values.username}
            onChange={formik.handleChange}
          />
        </Form.FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-5" controlId="formPassword">
        <Form.FloatingLabel label="Пароль">
          <Form.Control
            id="password"
            type="password"
            placeholder="Пароль"
            required
            className={passwordClass}
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {errorMessage}
          </Form.Control.Feedback>
        </Form.FloatingLabel>
      </Form.Group>

      <Button type="submit" variant="outline-primary" className="w-100 mb-3">
        Войти
      </Button>

    </Form>
  );
};

export default LoginForm;
