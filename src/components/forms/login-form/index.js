import { cn as bem } from '@bem-react/classname';
import propTypes from "prop-types";
import React, { useCallback } from 'react';
import Input from '../../input';
import './style.css';

function LoginForm(props) {
  const cn = bem('Loginform');

  const callbacks = {
    onLoginChange: useCallback(value => props.onLoginChange(value), [props.onLoginChange]),
    onPasswordChange: useCallback(value => props.onPasswordChange(value), [props.onPasswordChange]),
    onEnter: useCallback(e => props.onEnter, [props.onEnter])
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>{props.t('login.title')}</div>
      <div className={cn('field')}>{props.t('login.login')}</div>
      <Input
        value={props.login}
        onChange={callbacks.onLoginChange}
        type="text"
        theme="login"
      />
      <div className={cn('field')}>{props.t('login.password')}</div>
      <Input
        value={props.password}
        onChange={callbacks.onPasswordChange}
        type="password"
        theme="login"
      />
      {props.error ? <div className={cn('error')}>{props.error}</div> : null}
      <button className={cn('button')} onClick={props.onEnter}>{props.t('login.in')}</button>
    </div>
  );
};

LoginForm.propTypes = {
  login: propTypes.string,
  password: propTypes.string,
  onLoginChange: propTypes.func,
  onPasswordChange: propTypes.func,
  onEnter: propTypes.func,
  error: propTypes.string,
  t: propTypes.func
}

LoginForm.defaultProps = {
  login: '',
  password: '',
  error: null,
  onLoginChange: () => { },
  onPasswordChange: () => { },
  onEnter: () => { },
  t: (text) => text
}

export default React.memo(LoginForm);