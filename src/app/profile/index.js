import React from 'react'
import useSelector from '../../hooks/use-selector'
import { Navigate, useNavigate } from 'react-router-dom'
import useTranslate from '../../hooks/use-translate'
import Tools from '../../containers/tools'
import Layout from '../../components/layout'
import LayoutFlex from '../../components/layout-flex'
import LocaleSelect from '../../containers/locale-select'
import AuthContainer from '../../containers/auth-container'
import ProfileInfo from '../../components/profile-info'
import Spinner from '../../components/spinner'

function Profile() {
  const { t } = useTranslate()
  const navigate = useNavigate()

  const select = useSelector((state) => ({
    user: state.profile.user,
    auth: state.profile.auth,
    waiting: state.profile.waiting,
  }))

  if (!select.auth && !select.user.name) {
    navigate('/login')
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
        <ProfileInfo user={select.user} t={t} />
      </Spinner>
    </Layout>
  )
}

export default React.memo(Profile)
