import React from "react";
import {cn as bem} from "@bem-react/classname";
import Input from "../input";
import propTypes from 'prop-types';

import "./style.css";

function FormLogin({onPutLogin, onPutPassword, onFetch, errorMessage, t}) {
  const cn = bem('Form');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFetch();
  } 

  return(
    <form onSubmit={handleSubmit} className={cn()}>
      <h2 className={cn('title')}>{t('auth.title')}</h2>
        <div className={cn('box')}>
          <div className={cn('item')}>
            <label className={cn('label')}>{t('auth.label.login')}</label>
            <Input type="text" onChange={onPutLogin} value=""/>
          </div>

          <div className={cn('item')}>
            <label className={cn('label')}>{t('auth.label.pass')}</label>
            <Input type="password" onChange={onPutPassword} value=""/>
          </div>
        </div>
        {
          errorMessage ? <span className={cn('err')}>{errorMessage}</span> : null
        }
        <input className={cn('btn')} type="submit" value={t('auth.submit')}/>
    </form>
  )
}

FormLogin.propTypes = {
  onPutLogin: propTypes.func.isRequired,
  onPutPassword: propTypes.func.isRequired,
  onFetch: propTypes.func.isRequired,
  errorMessage: propTypes.string
}

export default React.memo(FormLogin)

