import React, { useCallback } from 'react'
import useStore from '../../hooks/use-store'
import useSelector from '../../hooks/use-selector'
import useTranslate from '../../hooks/use-translate'
import Tools from '../../containers/tools'
import Layout from '../../components/layout'
import LayoutFlex from '../../components/layout-flex'
import LocaleSelect from '../../containers/locale-select'
import LoginForm from '../../components/login-form'
import AuthContainer from '../../containers/auth-container'

function Login() {
  const store = useStore()

  const select = useSelector((state) => ({
    user: state.profile.user,
    error: state.profile.error,
    waiting: state.profile.waiting,
  }))

  const { t } = useTranslate()

  const callbacks = {
    login: useCallback((login, password) => store.get('profile').login(login, password), []),
  }

  return (
    <>
      <LayoutFlex flex='end'>
        <AuthContainer />
      </LayoutFlex>
      <Layout
        head={
          <LayoutFlex flex='between'>
            <h1>{t('title')}</h1>
            <LocaleSelect />
          </LayoutFlex>
        }>
        <Tools />
        <LoginForm login={callbacks.login} error={select.error} waiting={select.waiting} />
      </Layout>
    </>
  )
}

export default React.memo(Login)
