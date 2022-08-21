import React from 'react'
import Layout from '../../components/layout'
import LayoutFlex from '../../components/layout-flex'
import { LoginForm } from '../../components/login-form'
import LocaleSelect from '../../containers/locale-select'
import Tools from '../../containers/tools'
import useSelector from './../../hooks/use-selector';
import { useCallback } from 'react';
import useStore from './../../hooks/use-store';

export const Login = () => {
  const store = useStore();
  const select = useSelector(state => ({
    article: state.article.data,
    state: state.auth,
    isAuth:state.auth.isAuth
  }));
  const callbacks = {
    onAuth: useCallback((login,password) => store.get('auth').auth(login,password), []),
   
  };
  return (
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{select.article.title}</h1>
        <LocaleSelect />
      </LayoutFlex>
    }>
      <Tools />
      <LoginForm
      onAuth={callbacks.onAuth}
      isAuth={select.isAuth}
      />
    </Layout>
  )
}
