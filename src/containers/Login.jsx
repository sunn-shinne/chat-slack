import React from 'react';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import loginImg from '../../assets/loginImg.js';
import cn from 'classnames';

const schema = object({
  username: string().required('Обязательное поле!'),
  password: string().required('Обязательное поле!'),
});

const validate = async (values) => {
  const errors = {};
  try {
    await schema.validate(values);
  } catch (e) {
    const [message] = e.errors;
    errors[e.path] = message;
  } finally {
    return errors;
  }
}

const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validate,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  // const usernameClass = cn('form-control', formik.errors.username && 'is-invalid');
  // const passwordClass = cn('form-control', formik.errors.password && 'is-invalid');

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
              <form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">Войти</h1>
                <div className="form-floating mb-3">
                  <input
                    name="username"
                    autoComplete="username"
                    required
                    placeholder="Ваш ник"
                    id="username"
                    className="form-control"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="username">Ваш ник</label>
                  {/* {formik.errors.username ? <div className="invalid-tooltip">{formik.errors.username}</div> : null} */}
                </div>
                <div className="form-floating mb-4">
                  <div className="form-floating mb-3">
                    <input
                      name="password"
                      autoComplete="password"
                      type="password"
                      required
                      placeholder="Пароль"
                      id="password"
                      className="form-control"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                    <label htmlFor="password">Пароль</label>
                    {/* {formik.errors.password ? <div className="invalid-tooltip">{formik.errors.password}</div> : null} */}
                  </div>
                </div>
                <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
              </form>
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
}

export default Login;
