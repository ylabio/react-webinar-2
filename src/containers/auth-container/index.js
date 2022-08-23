import React, { useCallback } from 'react'
import useStore from '../../hooks/use-store'
import useSelector from '../../hooks/use-selector'
import useTranslate from '../../hooks/use-translate'
import Auth from '../../components/auth'
import useInit from '../../hooks/use-init'

function AuthContainer() {
  const store = useStore()

  const select = useSelector((state) => ({
    auth: state.profile.auth,
    userName: state.profile.user.name,
  }))

  useInit(
    async () => {
      await store.get('profile').initUser()
    },
    [select.auth],
    { backForward: false }
  )

  const { t } = useTranslate()

  const callbacks = {
    logOut: useCallback(() => {
      store.get('profile').logOut()
    }, []),
  }

  return <Auth auth={select.auth} logOut={callbacks.logOut} userName={select.userName} t={t} />
}

export default React.memo(AuthContainer)
