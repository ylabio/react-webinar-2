import React, {useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import useTranslate from '../../hooks/use-translate';
import FormInput from "../form-input";

const LoginForm = ({title, error, callback}) => {
  const cn = bem('Form');
  const {t} = useTranslate();
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    callback(login, pass);
  };

  return (
    <form className={cn()} onSubmit={onSubmit}>
      <h1>{title}</h1>
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
  title: propTypes.string,
  error: propTypes.string,
  callback: propTypes.func,
};

LoginForm.defaultProps = {};

export default React.memo(LoginForm);