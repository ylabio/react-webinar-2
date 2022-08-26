import React, { useCallback, useState } from 'react'
import useStore from '../../hooks/use-store'
import useSelector from '../../hooks/use-selector'
import useTranslate from '../../hooks/use-translate'
import Tools from '../../containers/tools'
import Layout from '../../components/layout'
import LayoutFlex from '../../components/layout-flex'
import LocaleSelect from '../../containers/locale-select'
import LoginForm from '../../components/login-form'
import AuthContainer from '../../containers/auth-container'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../components/spinner'

function Login() {
  const store = useStore()
  const { t } = useTranslate()
  const navigate = useNavigate()

  const callbacks = {
    login: useCallback((login, password) => {
      store.get('profile').login(login, password)
    }, []),
  }

  const select = useSelector((state) => ({
    auth: state.profile.auth,
    user: state.profile.user,
    error: state.profile.error,
    waiting: state.profile.waiting,
  }))

  if (select.auth) {
    return navigate(-1)
  }

  return (
    <Layout
      topHead={
        <LayoutFlex flex='end'>
          <AuthContainer />
        </LayoutFlex>
      }
      head={
        <LayoutFlex flex='between'>
          <h1>{t('title')}</h1>
          <LocaleSelect />
        </LayoutFlex>
      }>
      <Tools />
      <Spinner active={select.waiting}>
        <LoginForm login={callbacks.login} error={select.error} t={t} />
      </Spinner>
    </Layout>
  )
}

export default React.memo(Login)
