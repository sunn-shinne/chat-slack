import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Button } from 'react-bootstrap';
import { Formik, Field } from 'formik';
import cn from 'classnames';
import useAuth from '../../hooks/useAuth.js';

const LoginForm = ({ layoutClass }) => {
  const { t } = useTranslation();
  const { loginUser } = useAuth();

  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async (formValue) => {
    try {
      setIsLoading(true);
      await loginUser(formValue);
    } catch (e) {
      setIsValid(false);
      setErrorMessage(t('errors.user_not_exists'));
    } finally {
      setIsLoading(false);
    }
  };

  const usernameClass = cn('form-control', !isValid && 'is-invalid');
  const passwordClass = cn('form-control', !isValid && 'is-invalid');

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={handleLogin}
    >
      {({ handleSubmit }) => (
        <Form className={layoutClass} onSubmit={handleSubmit} autoComplete="off">
          <h1 className="text-center mb-4">{t('login')}</h1>

          <Form.FloatingLabel className="mb-3" controlId="username" label={t('fields.username')}>
            <Field
              id="username"
              type="text"
              name="username"
              placeholder={t('fields.username')}
              className={usernameClass}
              required
              autoFocus
            />
          </Form.FloatingLabel>

          <Form.FloatingLabel className="mb-5" controlId="password" label={t('fields.password')}>
            <Field
              id="password"
              type="password"
              name="password"
              placeholder={t('fields.password')}
              required
              className={passwordClass}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {errorMessage}
            </Form.Control.Feedback>
          </Form.FloatingLabel>

          <Button type="submit" variant="outline-primary" className="w-100 mb-3" disabled={isLoading}>
            {t('buttons.login')}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
