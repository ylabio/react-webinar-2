import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Page from '../../components/page'
import ProfileInfo from '../../components/profile-info'
import Spinner from '../../components/spinner'
import useInit from '../../hooks/use-init'
import useSelector from '../../hooks/use-selector'
import useTranslate from '../../hooks/use-translate'

function Profile() {
  const { t } = useTranslate()
  const select = useSelector(state => ({
    user: state.auth.user,
    isLoading: state.auth.isLoading
  }))
  const nav = useNavigate()
  const [loading, setLoading] = useState(true)

  useInit(() => {
    setLoading(select.isLoading)
  }, [select.isLoading])

  useInit(() => {
    if (!(select.user || loading)) {
      nav('/login')
    }
  }, [select.user, loading, nav])
  
  return (
    <Page title={"Магазин"}>
      <Spinner active={select.isLoading}>
        <ProfileInfo user={select.user} t={t} />
      </Spinner>
    </Page>
  )
}

export default React.memo(Profile) // Без пропсов