import React, {useCallback, useState} from "react";

import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";

import Tools from "../tools";

import UserLogin from "../../components/user-login";

function CabinetLogin() {

  const store = useStore();

  const select = useSelector(state => ({
    loginError: state.authorization.error
  }));

  //обработка ошибки авторизации
  let error = '';
  if (select.loginError?.data?.issues[0]?.message)
    error = select.loginError?.message+ '. ' + select.loginError?.data?.issues[0]?.message; 

  const callbacks = {
    onLogin: useCallback((e, login, password) => {store.get('authorization').login(login, password);
    e.preventDefault();
    e.target.reset();
    }, []),
  };

  const {t} = useTranslate();

  return (
    <>
      <Tools/>
      <UserLogin  in={t('login.in')} 
                  login={t('login.login')} 
                  pass={t('login.pass')}
                  error={error}
                  inButton={t('login.inButton')}
                  onLogin={callbacks.onLogin}/>      
    </>
  );
}

export default React.memo(CabinetLogin);
