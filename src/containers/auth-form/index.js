import React, {useEffect, useState} from 'react';
import LayoutFlex from '../../components/layout-flex';
import {useNavigate} from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import LoginForm from '../../components/login-form';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import Spinner from '../../components/spinner';

const AuthForm = () => {
  const [creds, setCreds] = useState({login:"", password:""})
  const navigate = useNavigate()
  const {t} = useTranslate()
  const store = useStore()
  const select = useSelector(state => ({
    token: state.auth.token,
    status: state.auth.status,
    waiting: state.auth.waiting
  }))
  useEffect(() => {
    if(select.token) {
      navigate('/')
    }
  }, [])
  useEffect(() => {
    if(select.token) {
      navigate('/profile')
    }
  }, [select.token])
  const callbacks = {
    // Сортировка
    onSetLogin: cred => setCreds({...creds, login: cred}),
    onSetPassword: cred => setCreds({...creds, password: cred}),
    onSubmitCallback: () => {
      if(creds.login && creds.password) {
        store.get('auth').pushAuth(creds.login, creds.password).then(r => console.log(r))
      }
    }
  }
  return (
    <LayoutFlex flex="start">
      <Spinner active={select.waiting}>
        <LoginForm title={t("auth.login")} buttonTitle={t("auth.loginto")} loginTitle={t("auth.username")}
                   passwordTitle={t("auth.password")} status={select.status}
                   handleLoginCallback={callbacks.onSetLogin} handlePasswordCallback={callbacks.onSetPassword}
                   submitCallback={callbacks.onSubmitCallback}/>
      </Spinner>
    </LayoutFlex>
  );
};

export default React.memo(AuthForm);