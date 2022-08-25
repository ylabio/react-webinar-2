import React from 'react'
import Layout from '../../components/layout'
import LayoutFlex from '../../components/layout-flex'
import { LoginForm } from '../../components/login-form'
import LocaleSelect from '../../containers/locale-select'
import Tools from '../../containers/tools'
import useSelector from './../../hooks/use-selector';
import { useCallback, useEffect } from 'react';
import useStore from './../../hooks/use-store';

export const Login = () => {
  const store = useStore();
  const select = useSelector(state => ({
    state: state.auth,
    isAuth:state.auth.isAuth
  }));
  const callbacks = {
    onAuth: useCallback((login,password) => store.get('auth').auth(login,password), []),
    me: useCallback(() => store.get('auth').me(), []),
  };


  return (
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{'Магазин'}</h1>
        <LocaleSelect />
      </LayoutFlex>
    }>
      <Tools />
      <LoginForm
      me={callbacks.me}
      onAuth={callbacks.onAuth}
      isAuth={select.isAuth}
      />
    </Layout>
  )
}
