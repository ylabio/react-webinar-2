import React, { useCallback, useRef } from "react"
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";
import Error from '../error';

function AuthForm({error, onSubmit}) {
  const cn = bem('AuthForm');
  const refForm = useRef(null);

  const callbacks = {
    onSubmit: useCallback((e) => {
      e.preventDefault();

      const form = refForm.current
      const login = refForm.current.elements.login.value;
      const password = refForm.current.elements.password.value;

      onSubmit({login, password}),
      form.reset();
    }, [])
  }

  return (
    <form ref={refForm} className={cn()} onSubmit={(e) => callbacks.onSubmit(e)}>
      <h2 className={cn('title')}>Вход</h2>
      <div className={cn('container')}>
        <label>
          Логин
          <input className="Input" id={'login'} name={'login'}></input>
        </label>
        <label>
          Пароль
          <input className="Input" id={'password'} name={'password'} type="password"></input>
        </label>
        {error && <Error text={error} />}
        <button>Войти</button>
      </div>
    </form>
  )
}

AuthForm.propTypes = {
  error: propTypes.string,
  onSubmit: propTypes.func,
}

AuthForm.defaultProps = {
  onSubmit: () => {},
}

export default React.memo(AuthForm);
