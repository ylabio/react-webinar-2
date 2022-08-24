import React, { useCallback, useEffect } from 'react'
import LayoutForm from '../layout-form'
import LoginError from '../login-error'
import LoginInput from '../login-input'
import useSelector from '../../hooks/use-selector'
import useStore from '../../hooks/use-store'
import useTranslate from '../../hooks/use-translate';

function LoginForm() {
  const {t} = useTranslate()
  const store = useStore()
  const select = useSelector(state => ({
    auth: state.auth.auth,
  }));

  useEffect(() => {
    return () => {
      store.get('auth').resetState()
    }
  }, []);

  const callbacks = {
    onSubmit: useCallback(() => store.get('auth').logIn(select.auth), []),
    loginChange: useCallback((v) => store.get('auth').setLogin(v), []),
    passwordChange: useCallback((v) => store.get('auth').setPassword(v), []),
    resetError: useCallback(() => store.get('auth').resetError(), [])
  }

  return (
    <LayoutForm title={<h2>{t('login.title')}</h2>} 
                submitText={t('login.submit')} 
                err={select.auth.isErr && <LoginError t={t} code={select.auth.errCode}/>}
                onSubmit={callbacks.onSubmit}
    >
      <LoginInput title={t('login.username')}
                  onChange={callbacks.loginChange}
                  onFocus={select.auth.isErr ? callbacks.resetError : () => {}}
                  value={select.auth.login}
                  type='text'
      />
      <LoginInput title={t('login.password')}
                  onChange={callbacks.passwordChange}
                  onFocus={select.auth.isErr ? callbacks.resetError : () => {}}
                  value={select.auth.password}
                  type='password'
      />
    </LayoutForm>
  )
}

export default React.memo(LoginForm);