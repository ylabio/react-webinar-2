import React from 'react'
import useStore from '../../hooks/use-store'
import useSelector from '../../hooks/use-selector'
import { Navigate } from 'react-router-dom'
import useTranslate from '../../hooks/use-translate'
import Tools from '../../containers/tools'
import Layout from '../../components/layout'
import LayoutFlex from '../../components/layout-flex'
import LocaleSelect from '../../containers/locale-select'
import AuthContainer from '../../containers/auth-container'
import ProfileInfo from '../../components/profile-info'

function Profile() {
  const store = useStore()

  const select = useSelector((state) => ({
    user: state.profile.user,
    auth: state.profile.auth,
  }))

  if (!select.auth) {
    return <Navigate to={'/login'} />
  }

  const { t } = useTranslate()

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
      <ProfileInfo user={select.user} t={t} />
    </Layout>
  )
}

export default React.memo(Profile)
