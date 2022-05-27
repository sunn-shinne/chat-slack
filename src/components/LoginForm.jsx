import React, { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import cn from 'classnames';

const LoginForm = ({ layoutClass }) => {
  const [errors, setErrors] = React.useState({});
  const target = useRef(null);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/api/v1/login', values);
        localStorage.setItem('token', response.data.token);
        setErrors({});
      } catch (e) {
        setErrors({ request: 'Неверные имя пользователя или пароль' });
      }
    },
  });

  const usernameClass = cn('form-control', errors.request && 'is-invalid');
  const passwordClass = cn('form-control', errors.request && 'is-invalid');

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
            {errors.request}
          </Form.Control.Feedback>

        </Form.FloatingLabel>

      </Form.Group>

      <Button ref={target} type="submit" variant="outline-primary" className="w-100 mb-3">
        Войти
      </Button>

    </Form>
  );
};

export default LoginForm;
