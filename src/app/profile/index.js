import React from 'react'
import Layout from '../../components/layout'
import LayoutFlex from '../../components/layout-flex'
import UserCard from '../../components/user-card'
import ControlBar from '../../containers/control-bar'
import LocaleSelect from '../../containers/locale-select'
import Tools from '../../containers/tools'
import useSelector from '../../hooks/use-selector'
import useTranslate from '../../hooks/use-translate'
import { Navigate } from "react-router-dom";


function Profile() {
  const { t } = useTranslate();
  const select = useSelector(state => ({
    info: state.profile,
    isAuth: state.auth.isSigned
  }));
  if (!select.isAuth) {
    return (
      <Navigate replace to='/login' />
    )
  }

  return (
    <>
      <Layout
        overHead={
          <ControlBar />
        }
        head={
          <LayoutFlex flex="between">
            <h1>{t('title')}</h1>
            <LocaleSelect />
          </LayoutFlex>
        }>
        <Tools />
        <UserCard user={select.info} />
      </Layout>
    </>
  )
}

export default Profile
