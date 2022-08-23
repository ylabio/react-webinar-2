import React from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import './style.css';
import { Link } from 'react-router-dom';
import { Field, Formik, Form } from 'formik';
import * as Yup from 'yup';

const AuthSchema = Yup.object().shape({
  login: Yup.string().required(),
  password: Yup.string().required(),
});

function LoginForm({ translate, onSubmit, error }) {
  const initialValues = { login: '', password: '' };

  const cn = bem('Login');
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        onSubmit(values);
        actions.resetForm();
      }}
      validationSchema={AuthSchema}>
      <Form className={cn('form')}>
        <legend className={cn('legend')}>{translate('login')}</legend>
        <label htmlFor='login' className={cn('label')}>
          {translate('login.login')}
        </label>
        <Field type='text' id='login' name='login' className={cn('input')} />
        <label htmlFor='password' className={cn('label')}>
          {translate('login.password')}
        </label>
        <Field type='password' id='password' name='password' className={cn('input')} />

        <button type='submit' className={cn('submit')}>
          {translate('login.enter')}
        </button>

        {error && <div className={cn('error')}>{error.data.issues[0].message}</div>}
      </Form>
    </Formik>
  );
}

LoginForm.propTypes = {
  onSubmit: propTypes.func.isRequired,
  translate: propTypes.func.isRequired,
  error: propTypes.object,
};

LoginForm.defaultProps = {};

export default React.memo(LoginForm);
