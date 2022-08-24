import React, {useCallback, useState} from 'react';
import propTypes, {object} from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css';

function LoginForm(props) {

  const cn = bem('LoginForm');

  const cb = {
    logIn: useCallback((e) => {
      e.preventDefault();

      // Функция принимающая логин и пароль с инпутов
      return props.logIn({
        "login": `${e.target[0].value}`,
        "password": `${e.target[1].value}`,
      })
    }, []),
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>{props.t('panel.enter')}</div>
      <form onSubmit={cb.logIn}>
        <label>
          {props.t('form.login')}
          <input type="text" />
        </label>
        <label>
          {props.t('form.pass')}
          <input type="password" />
        </label>
        <div className={cn('err')}>
          {
            props.err.map((item, index) => <p key={index}>{item.message}</p>)
          }
        </div>
        <button>{props.t('form.btn')}</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  logIn: propTypes.func,
  err: propTypes.arrayOf(propTypes.object),
  t: propTypes.func,
}

LoginForm.defaultProps = {
  logIn: () => {},
  err: [],
  t: () => {},
}

export default React.memo(LoginForm);
