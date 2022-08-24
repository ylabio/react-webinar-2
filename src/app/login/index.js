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
import { Navigate, useHref, useInRouterContext, useLocation, useNavigate } from 'react-router-dom'

function Login() {
  const store = useStore()
  // const location = useLocation()
  // location.state = true
  // console.log(location)
  // const [moveLocation, setMoveLocation] = useState(location.state)
  const navigate = useNavigate()
  const location = useLocation()
  // const [locateKey, setLocateKey] = useState(() => '')
  // useHref()
  // console.log(location.key)
  // console.log(useLocation())

  const select = useSelector((state) => ({
    auth: state.profile.auth,
    user: state.profile.user,
    error: state.profile.error,
    waiting: state.profile.waiting,
    locateKey: state.profile.locateKey,
  }))
  console.log(select.locateKey)
  console.log(location.key)
  if (select.locateKey && select.locateKey !== location.key) {
    // location.state = false
    store.get('profile').logOut()
  }

  const { t } = useTranslate()

  const callbacks = {
    login: useCallback((login, password) => {
      store.get('profile').login(login, password)
      // store.get('profile').clearLocateKey(location.key)
    }, []),
  }

  if (select.auth) {
    return <Navigate to={'/profile'} replace />
    // return navigate(-1)
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
      <LoginForm login={callbacks.login} error={select.error} waiting={select.waiting} t={t} />
    </Layout>
  )
}

export default React.memo(Login)
