import React, {useCallback, useState} from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css'
import useTranslate from "../../hooks/use-translate";

const LoginForm = ({logIn, error}) => {
  const cn = bem('login');
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const {t} = useTranslate();
  const callbacks = {
    logIn: useCallback(() => logIn(login, password), [login, password])
  }

  return (
    <div className={cn()}>
      <div className={cn('title')}>{t('signIn')}</div>
      <div className={cn('inputContainer')}>
        <div>{t('login')}</div>
        <input value={login} onChange={e => setLogin(e.target.value)}/>
      </div>
      <div className={cn('inputContainer')}>
        <div>{t('password')}</div>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
      </div>
      {error && <div className={cn('error')}>{error.message}</div>}
      <div className={cn('inputContainer')}>
        <button onClick={callbacks.logIn}>{t('signIn')}</button>
      </div>
    </div>
  );
};

export default React.memo(LoginForm);