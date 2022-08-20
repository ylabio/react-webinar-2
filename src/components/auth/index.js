import React from 'react';
import Input from '../input';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function Auth({ isError, login, setLogin, password, setPassword, handleSubmit, t }){
  const cn = bem('Auth');

  return (
    <form className={cn()} onSubmit={ handleSubmit }>
      <h2>{t('entery')}</h2>
      <label>
        <p className={cn('label')}>{t('login')}</p>
        <Input value={login} onChange={setLogin}/>
      </label>
      <label>
        <p className={cn('label')}>{t('password')}</p>
        <Input value={password} onChange={setPassword} type="password"/>
      </label>
      {isError && <p className={cn('error')}>{t('error')}</p>}
      <button className={cn('submit')} type='submit'>{t('enter')}</button>
    </form>
  )
}

Auth.propTypes = {
  isError: propTypes.bool,
  login: propTypes.string,
  setLogin: propTypes.func,
  password: propTypes.string,
  setPassword: propTypes.func,
  handleSubmit: propTypes.func,
  t: propTypes.func
}

Auth.defaultProps = {
}

export default React.memo(Auth);
