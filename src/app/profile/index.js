import React, { useEffect } from 'react'
import Layout from '../../components/layout'
import LayoutFlex from '../../components/layout-flex'
import UserCard from '../../components/user-card'
import ControlBar from '../../containers/control-bar'
import LocaleSelect from '../../containers/locale-select'
import Tools from '../../containers/tools'
import useSelector from '../../hooks/use-selector'
import useTranslate from '../../hooks/use-translate'
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader'

function Profile() {
  const { t } = useTranslate();
  const navigate = useNavigate()
  const select = useSelector(state => ({
    info: state.profile,
    isAuth: state.auth.isSigned
  }));
  useEffect(() => {
    if (select.isAuth === false) {
      navigate('/login')
    }
  }, [select.isAuth])
  if (select.isAuth !== false && select.isAuth !== null) {
    return (
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
    )
  }
  return (
    <>
      <Loader />
    </>
  )
}

export default Profile
