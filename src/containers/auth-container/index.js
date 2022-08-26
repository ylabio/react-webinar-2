import React, { useCallback } from 'react'
import useStore from '../../hooks/use-store'
import useSelector from '../../hooks/use-selector'
import useTranslate from '../../hooks/use-translate'
import Auth from '../../components/auth'
import useInit from '../../hooks/use-init'
import Spinner from '../../components/spinner'

function AuthContainer() {
  const store = useStore()
  const callbacks = {
    logOut: useCallback(() => {
      store.get('profile').logOut()
    }, []),
  }

  const select = useSelector((state) => ({
    auth: state.profile.auth,
    userName: state.profile.user.name,
    waiting: state.profile.waiting,
  }))

  const { t } = useTranslate()

  return (
    <Spinner active={select.waiting}>
      <Auth auth={select.auth} logOut={callbacks.logOut} userName={select.userName || ''} t={t} />
    </Spinner>
  )
}

export default React.memo(AuthContainer)
