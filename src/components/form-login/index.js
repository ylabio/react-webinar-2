import React from 'react';
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname'
import {Link} from "react-router-dom";
import './style.css';

function FormLogin(props) {
  const cn = bem('FormLogin');

  return (
      <form className={cn()}>
        <div className={cn('login')}>
          <div>Логин</div>
          <input type="text" value="Anyvalue"/>
        </div>
        <div className={cn('password')}>
          <div>Пароль</div>
          <input type="text" value="Anyvalue"/>
        </div>
        <div className={cn('error')}>Некая ошибка от сервера</div>
        <div className={cn('btn')}>
          <Link to={props.link}>Войти</Link>
        </div>
      </form>
  )
}

FormLogin.propTypes = {

}

FormLogin.defaultProps = {
 
}

export default React.memo(FormLogin);