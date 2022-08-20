import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Auth from '../../components/auth'
import LayoutFlex from '../../components/layout-flex'
import useInit from '../../hooks/use-init'
import useSelector from '../../hooks/use-selector'
import useStore from '../../hooks/use-store'
import useTranslate from '../../hooks/use-translate'

function LoginTool() {
  const {t} = useTranslate()
  const store = useStore()
  const user = useSelector(state => state.auth.user)
  const nav = useNavigate()

  useInit(() => {
    if (!user && localStorage.getItem('TOKEN')) {
      store.get('auth').getProfile()
    }
  }, [], {backForward: false})

  const callbacks = {
    toLogin: useCallback(() => nav('/login'), [nav]),
    logOut: useCallback(() => store.get('auth').logOut(), []),
  }

  return (
    <LayoutFlex flex='end' padding={false}>
      <Auth t={t} username={user?.profile.name} toLogin={callbacks.toLogin} logOut={callbacks.logOut} toProfile={'/profile'}/>
    </LayoutFlex>
  )
}

export default React.memo(LoginTool) // Без пропсов