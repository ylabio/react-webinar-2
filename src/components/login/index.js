import React, { useState } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Login(props) {
  const cn = bem('Login');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{props.t('auth.signin')}</h2>
      <form onSubmit={props.onSubmit} className={cn('form')}>
        <label className={cn('label')}>
        {props.t('auth.username')}
          <input
            className={cn('input')}
            type='text'
            name='login'
            value={props.username}
            onChange={e => props.onFormChange(e)}
          />
        </label>
        <label className={cn('label')}>
        {props.t('auth.password')}
          <input
            className={cn('input')}
            type='password'
            name='password'
            value={props.password}
            onChange={e => props.onFormChange(e)}
          />
        </label>
        {props.error && <div className={cn('error')}>{props.error}</div>}
        <button type='submit' className={cn('btn')}>
        {props.t('auth.login')}
        </button>
      </form>
    </div>
  );
}

export default Login;

Login.propTypes = {
  username: propTypes.string.isRequired,
  password: propTypes.string.isRequired,
  onFormChange: propTypes.func,
  onSubmit: propTypes.func,
  errors: propTypes.string,
};

Login.defaultProps = {};
