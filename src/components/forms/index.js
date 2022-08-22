import React from 'react';
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname'
import './style.css';
import {Field, Form, Formik} from "formik";

function Forms(props) {
  const cn = bem('Forms');

  return (
    <div className={cn()}>
      <h2>Вход</h2>
      <Formik
        initialValues={{email: "", password: ""}}
        onSubmit={(values) => {
          props.onSubmit(values.email, values.password)
        }}>
        {() => (
          <Form onClick={props.resetError}>
            <div className={cn('field-email')}>
              <div>Логин</div>
              <Field type={'text'} name={'email'} placeholder={'email'} required/>
            </div>
            <div className={cn('field-password')}>
              <div>Пароль</div>
              <Field type={'password'} name={'password'} placeholder={'password'} required/>
              <div className={cn('error')}>{props.error}</div>
            </div>
            <button type={'submit'}>Войти</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

Forms.propTypes = {
  onSubmit: propTypes.func.isRequired,
  error: propTypes.string,
  resetError: propTypes.func.isRequired,
}

export default React.memo(Forms);
