import React from 'react';
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname'
import {Link} from "react-router-dom";
import './style.css';

function FormLogin(props) {
  const cn = bem('Login');
  console.log(cn('form-login'))
  return (
    <div className={cn()}>
      <h2>Вход</h2>
      <form className={cn('form')}>
        <div className={cn('form-login')}>
          <div>Логин</div>
          <input type="text" value="Anyvalue"/>
        </div>
        <div className={cn('form-login')}>
          <div>Пароль</div>
          <input type="text" value="Anyvalue"/>
        </div>
        <div className={cn('error')}>Некая ошибка от сервера</div>
        <div className={cn('btn')}>
          <Link to={props.link}>Войти</Link>
        </div>
      </form>
    </div>
  )
}

FormLogin.propTypes = {

}

FormLogin.defaultProps = {
 
}

export default React.memo(FormLogin);