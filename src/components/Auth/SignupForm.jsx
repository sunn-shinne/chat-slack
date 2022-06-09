import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { object, string, ref } from 'yup';
import cn from 'classnames';
import useAuth from '../../hooks/useAuth.js';

const SignupForm = ({ layoutClass }) => {
  const { t } = useTranslation();
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState(true);
  const { signupUser } = useAuth();

  const validationSchema = object({
    username: string()
      .required(t('errors.required'))
      .min(3, t('errors.min_max'))
      .max(20, t('errors.min_max')),
    password: string()
      .required(t('errors.required'))
      .min(6, t('errors.min')),
    confirmPassword: string()
      .oneOf([ref('password')], t('errors.must_match')),
  });

  const handleSignup = async (formValue) => {
    try {
      await signupUser(formValue);
    } catch (e) {
      setIsValid(false);
      setErrorMessage(t('errors.user_exists'));
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
      <h1 className="text-center mb-4">{t('signup')}</h1>

      <Form.Group className="mb-3" controlId="formUsername">
        <Form.FloatingLabel label={t('fields.username')}>
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
        <Form.FloatingLabel label={t('fields.password')}>
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
        <Form.FloatingLabel label={t('fields.confirm_password')}>
          <Form.Control
            id="confirmPassword"
            type="password"
            placeholder={t('errors.must_match')}
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
        {t('buttons.signup')}
      </Button>

    </Form>
  );
};

export default SignupForm;
