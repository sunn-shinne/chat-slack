import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { object, string, ref } from 'yup';
import cn from 'classnames';
import useAuth from '../../hooks/useAuth.js';

const validationSchema = object({
  username: string()
    .required('Обязательное поле')
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов'),
  password: string()
    .required('Обязательное поле')
    .min(6, 'Не менее 6 символов'),
  confirmPassword: string()
    .oneOf([ref('password')], 'Пароли должны совпадать'),
});

const SignupForm = ({ layoutClass }) => {
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState(true);
  const { signupUser } = useAuth();

  const handleSignup = async (formValue) => {
    try {
      await signupUser(formValue);
    } catch (e) {
      setIsValid(false);
      setErrorMessage('Такой пользователь уже существует');
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: handleSignup,
  });

  const getInpitClass = (name) => cn('form-control', {
    'is-invalid': formik.touched[name] && (formik.errors[name] || !isValid),
  });

  return (
    <Form className={layoutClass} onSubmit={formik.handleSubmit} autoComplete="off">
      <h1 className="text-center mb-4">Регистрация</h1>

      <Form.Group className="mb-3" controlId="formUsername">
        <Form.FloatingLabel label="Ваш ник">
          <Form.Control
            id="username"
            type="username"
            placeholder="Ваш ник"
            required
            className={getInpitClass('username')}
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.username}
          </Form.Control.Feedback>
        </Form.FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.FloatingLabel label="Пароль">
          <Form.Control
            id="password"
            type="password"
            placeholder="Пароль"
            required
            className={getInpitClass('password')}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.password}
          </Form.Control.Feedback>
        </Form.FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formConfirmPassword">
        <Form.FloatingLabel label="Подтвердите пароль">
          <Form.Control
            id="confirmPassword"
            type="password"
            placeholder="Пароли должны совпадать"
            required
            className={getInpitClass('confirmPassword')}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.confirmPassword ?? errorMessage}
          </Form.Control.Feedback>
        </Form.FloatingLabel>
      </Form.Group>

      <Button type="submit" variant="outline-primary" className="w-100 mb-3">
        Зарегистрироваться
      </Button>

    </Form>
  );
};

export default SignupForm;
