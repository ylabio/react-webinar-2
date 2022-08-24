import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfileInfo from '../../components/profile-info'
import Spinner from '../../components/spinner'
import useSelector from '../../hooks/use-selector'
import useTranslate from '../../hooks/use-translate';
import Layout from '../../components/layout';
import LayoutFlex from "../../components/layout-flex";
import LoginPanel from '../../containers/login-panel';
import LocaleSelect from "../../containers/locale-select";
import Tools from "../../containers/tools";


function Profile() {
  const {t} = useTranslate()
  const select = useSelector(state => ({
    user: state.auth.user,
    isLoading: state.auth.isLoading,
    loadingErr: state.auth.loadingErr
  }))
  const nav = useNavigate()

  useEffect(() => {
    if (!(select.user || select.isLoading) || !localStorage.getItem('TOKEN') || select.loadingErr) {
      nav('/login')
    }
  }, [select.user, select.loadingErr, select.isLoading, nav])

  return (
    <Layout top={<LoginPanel />} 
            head={
              <LayoutFlex flex="between">
                 <h1>{t('title')}</h1>
                 <LocaleSelect/>
              </LayoutFlex>
              }>
      <Tools/>
      <Spinner active={select.isLoading}>
        <ProfileInfo user={select.user} t={t} />
      </Spinner>
    </Layout>
    
  )
}

export default React.memo(Profile);