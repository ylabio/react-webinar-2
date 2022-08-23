import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Page from '../../containers/page'
import ProfileInfo from '../../components/profile-info'
import Spinner from '../../components/spinner'
import useSelector from '../../hooks/use-selector'
import useTranslate from '../../hooks/use-translate'

function Profile() {
  const { t } = useTranslate()
  const select = useSelector(state => ({
    user: state.session.user,
    isLoading: state.session.isLoading,
    loadingErr: state.session.loadingErr
  }))
  const nav = useNavigate()

  useEffect(() => {
    if (!(select.user || select.isLoading) || !localStorage.getItem('TOKEN') || select.loadingErr) {
      nav('/login')
    }
  }, [select.user, select.loadingErr, select.isLoading, nav])

  return (
    <Page title={t('title')}>
      <Spinner active={select.isLoading}>
        <ProfileInfo user={select.user} t={t} />
      </Spinner>
    </Page>
  )
}

export default React.memo(Profile) // Без пропсов