import React from 'react'
import { useNavigate } from 'react-router-dom'
import Page from '../../components/page'
import LoginForm from '../../containers/login/form'
import useInit from '../../hooks/use-init'
import useSelector from '../../hooks/use-selector'
import useTranslate from '../../hooks/use-translate'

function Login () {
  const { t } = useTranslate()
  const select = useSelector(state => ({
    user: state.auth.user
  }))
  const nav = useNavigate()
  
  useInit(() => {
    if (select.user) {
      nav('/profile', {replace: true})
    }
  }, [select.user], {backForward: true})
  
  return (
    <Page title={t('title')}>
      <LoginForm />
    </Page>
  )
}

export default React.memo(Login) // Без пропсов