import React, {useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import FormInput from "../form-input";

const LoginForm = ({error, callback, t}) => {
  const cn = bem('Form');
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    callback(login, pass);
  };

  return (
    <form className={cn()} onSubmit={onSubmit}>
      <h1>{t('auth.title')}</h1>
      <FormInput
        label={t('auth.login')}
        value={login}
        onChange={setLogin}
      />
      <FormInput label={t('auth.pass')} value={pass} onChange={setPass} type={'password'}/>
      <span className={cn('error')}>{error}</span>
      <button>{t('auth.enter')}</button>
    </form>
  );
};

LoginForm.propTypes = {
  error: propTypes.string,
  callback: propTypes.func,
  t: propTypes.func
};

LoginForm.defaultProps = {};

export default React.memo(LoginForm);