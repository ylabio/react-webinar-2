import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function AuthForm(props) {
  const cn = bem('AuthForm');

  return (
    <div className={cn()}>
      <div className={cn('header')}>Вход</div>
      <div className={cn('form')}>
      <div className={cn('login')}></div>
      <div className={cn('password')}></div>
      <button className={cn('form-button')}>Войти</button>
      </div>
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
