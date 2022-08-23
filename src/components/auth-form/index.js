import React, {useCallback, useMemo} from "react";
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import { Link, useNavigate } from "react-router-dom";
import './style.css';

function AuthForm(props) {
  const cn = bem('AuthForm');
  const navigate = useNavigate()

  const callbacks = {
    onAuth: useCallback((e) => {
      e.preventDefault();
      props.onAuth(e.target[0].value, e.target[1].value), [props.onAuth];
      navigate('/profile');
    }),
  };

  return (
    <div className={cn()}>
      <div className={cn('header')}>Вход</div>
      <form className={cn('form')} onSubmit={callbacks.onAuth}>
        <div className={cn("label")}>Логин</div>
        <input type="text" className={cn("input")} />

        <div className={cn("label")}>Пароль</div>
        <input type="password" className={cn("input")} />

        <input className={cn("actions")} type="submit" value='Войти' />
      </form>
    </div>
  )
}

AuthForm.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  renderItem: propTypes.func
}

AuthForm.defaultProps = {
  items: [],
  renderItem: (item) => {
    return item.toString()
  }
}

export default React.memo(AuthForm);
