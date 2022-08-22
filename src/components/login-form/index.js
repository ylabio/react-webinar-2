import React, { useCallback } from "react";
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

import useTranslate from "../../hooks/use-translate";



const LoginForm = (props) => {

  const cn = bem('LoginForm');
  const { t } = useTranslate();

  const callbacks = {
    login: useCallback((e) => {
      e.preventDefault();
      props.loginFetch(props.login, props.password);
    }, [props.login, props.password])
  };

   return (
    <form className={cn()}>
      <h2>{t("auth.enter")}</h2>
      <div className={cn('forms')} >
        <div className={cn('form')}>
          <p>{t("auth.name")}</p>
          <input 
            type='text'
            value={props.login} 
            onChange={(e) => props.setLoginForm({ login: e.target.value, password: props.password })}/>
        </div>
        <div className={cn('form')}>
          <p>{t("auth.password")}</p>
          <input 
            value={props.password}  
            type="password" 
            onChange={(e) => props.setLoginForm({ login: props.login, password: e.target.value })}/>
        </div>
      </div>

      <p className={cn('error')}>
        {props.error ? props.error : ""}
      </p>
      <button 
          className={cn("button")} 
          onClick={callbacks.login}>
        {t("auth.button")}
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  login: propTypes.string.isRequired,
  password: propTypes.string.isRequired,
  setLoginForm: propTypes.func,
  loginFetch: propTypes.func
}

LoginForm.defaultProps = {
  setLoginForm: () => { },
  loginFetch: () => { },
}

export default React.memo(LoginForm);
