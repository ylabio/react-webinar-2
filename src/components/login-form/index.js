import React, {useState} from 'react';
import Input from '../input';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import useTranslate from '../../hooks/use-translate';
import InputBlock from '../input-block';
import useSelector from '../../hooks/use-selector';

const LoginForm = ({title, authMessage, callback}) => {
  const cn = bem('Form');
  const {t} = useTranslate();
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');

  // const select = useSelector((state) => ({
  //   login: state.auth.login,
  // }));

  const onSubmit = (e) => {
		e.preventDefault();
    callback(login, pass);
  };

  return (
    <form className={cn()} onSubmit={onSubmit}>
      <h1>{title}</h1>
      <InputBlock
        label={t('auth.login')}
        value={login}
        onChange={setLogin}
      />
      <InputBlock label={t('auth.pass')} type='password' value={pass} onChange={setPass} />
      <span className={cn('error')}>{authMessage}</span>
      <button>{t('auth.enter')}</button>
    </form>
  );
};

LoginForm.propTypes = {
  title: propTypes.string,
  authMessage: propTypes.string,
  callback: propTypes.func,
};

LoginForm.defaultProps = {};

export default React.memo(LoginForm);
