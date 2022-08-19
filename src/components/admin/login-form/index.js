import React, {useCallback, useState} from 'react';
import propTypes, {object} from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css';

function LoginForm(props) {

  const cn = bem('LoginForm');
  const [localErr, setLocalErr] = useState('');

  const cb = {
    logIn: useCallback((e) => {
      e.preventDefault();

      if(e.target[0].value.trim() === '' || e.target[1].value.trim() === '') {
        return setLocalErr('Поля не должны быть пустыми')
      }

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
            localErr
              ? localErr
              : props.err && props.t('form.err')
          }
        </div>
        <button>{props.t('form.btn')}</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  logIn: propTypes.func,
  err: propTypes.string,
  t: propTypes.func,
}

LoginForm.defaultProps = {
  logIn: () => {},
  err: '',
  t: () => {},
}

export default React.memo(LoginForm);
