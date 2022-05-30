import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import cn from 'classnames';
import { loginUser } from '../slices/authSlice.js';
import { clearMessage, setMessage } from '../slices/messageSlice.js';

const LoginForm = ({ layoutClass }) => {
  const [isValid, setIsValid] = useState(true);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleLogin = (formValue) => {
    dispatch(loginUser(formValue))
      .unwrap()
      .then(() => {
        setIsValid(true);
        dispatch(clearMessage());
      })
      .catch(() => {
        setIsValid(false);
        dispatch(setMessage('Неверные имя пользователя или пароль'));
      });
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
    <Form className={layoutClass} onSubmit={formik.handleSubmit}>
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
            autoComplete="off"
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
            autoComplete="off"
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {message}
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
