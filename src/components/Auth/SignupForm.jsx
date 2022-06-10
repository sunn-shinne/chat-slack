import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Button } from 'react-bootstrap';
import { Formik, ErrorMessage, Field } from 'formik';
import { object, string, ref } from 'yup';
import cn from 'classnames';
import useAuth from '../../hooks/useAuth.js';

const SignupForm = ({ layoutClass }) => {
  const { t } = useTranslation();
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [signupErrorMessage, setSignupErrorMessage] = useState(null);
  const { signupUser } = useAuth();

  const schema = object().shape({
    username: string()
      .required(t('errors.required'))
      .min(3, t('errors.min_max'))
      .max(20, t('errors.min_max')),
    password: string()
      .required(t('errors.required'))
      .min(6, t('errors.min')),
    confirmPassword: string()
      .oneOf([ref('password'), null], t('errors.must_match')),
  });

  const handleSignup = async (formValue) => {
    try {
      setIsLoading(true);
      await signupUser(formValue);
    } catch (e) {
      setIsValid(false);
      setSignupErrorMessage(t('errors.user_exists'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '', confirmPassword: '' }}
      validationSchema={schema}
      onSubmit={handleSignup}
    >
      {({ errors, touched, handleSubmit }) => (
        <Form className={layoutClass} onSubmit={handleSubmit} autoComplete="off">
          <h1 className="text-center mb-4">{t('signup')}</h1>

          <Form.FloatingLabel className="mb-3" controlId="username" label={t('fields.new_username')}>
            <Field
              id="username"
              type="text"
              name="username"
              placeholder={t('errors.min_max')}
              required
              className={cn('form-control', { 'is-invalid': touched.username && (errors.username || !isValid) })}
              autoFocus
            />
            <ErrorMessage name="username">
              {(msg) => <Form.Control.Feedback type="invalid" tooltip>{msg}</Form.Control.Feedback>}
            </ErrorMessage>
          </Form.FloatingLabel>

          <Form.FloatingLabel className="mb-3" controlId="password" label={t('fields.password')}>
            <Field
              id="password"
              type="password"
              name="password"
              placeholder={t('errors.min')}
              required
              className={cn('form-control', { 'is-invalid': touched.password && (errors.password || !isValid) })}
            />
            <ErrorMessage name="password">
              {(msg) => <Form.Control.Feedback type="invalid" tooltip>{msg}</Form.Control.Feedback>}
            </ErrorMessage>
          </Form.FloatingLabel>

          <Form.FloatingLabel className="mb-3" controlId="confirmPassword" label={t('fields.confirm_password')}>
            <Field
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder={t('errors.must_match')}
              required
              className={cn('form-control', { 'is-invalid': touched.confirmPassword && (errors.confirmPassword || !isValid) })}
            />
            <ErrorMessage name="confirmPassword">
              {(msg) => <Form.Control.Feedback type="invalid" tooltip>{msg}</Form.Control.Feedback>}
            </ErrorMessage>
            <Form.Control.Feedback type="invalid" tooltip>
              {signupErrorMessage}
            </Form.Control.Feedback>
          </Form.FloatingLabel>

          <Button type="submit" variant="outline-primary" className="w-100 mb-3" disabled={isLoading}>
            {t('buttons.signup')}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
