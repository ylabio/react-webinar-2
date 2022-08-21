import React, {useCallback} from 'react';
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import LoginInput from "../../components/login-input";
import LayoutForm from "../../components/layout-form";
import LoginError from "../../components/login-error";

function LoginForm() {

  const store = useStore();
  const {t} = useTranslate();

  const select = useSelector(state => ({
    auth: state.login.auth,
  }))

  const callbacks = {
    onLogin: useCallback(() => store.get('login').login(select.auth), []),
    setLogin: useCallback((val) => store.get('login').setLogin(val), []),
    setPassword: useCallback((val) => store.get('login').setPassword(val), []),
    resetError: useCallback(() => store.get('login').resetError(), [])
  }
  return (
    <LayoutForm title={t('login.title')}
                onSubmit={callbacks.onLogin}
                onSubmitText={t('login.submit')}>
      <LoginInput title={t('login.userLogin')}
                  value={select.auth.login}
                  onChange={callbacks.setLogin}
                  type={'text'}
                  onFocus={select.auth.isError ? callbacks.resetError : () => {
                  }}/>
      <LoginInput title={t('login.userPassword')}
                  value={select.auth.password}
                  onChange={callbacks.setPassword}
                  type={'password'}
                  onFocus={select.auth.isError ? callbacks.resetError : () => {
                  }}/>
      {select.auth.isError && <LoginError t={t}/>}
    </LayoutForm>
  )
}

export default React.memo(LoginForm);
