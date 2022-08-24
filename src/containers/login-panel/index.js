import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Auth from '../../components/auth';
import LayoutFlex from '../../components/layout-flex';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';

function LoginPanel() {
  const {t} = useTranslate()
  const store = useStore()
  const {user, loadingErr} = useSelector(state => ({user: state.profile.user, loadingErr: state.profile.loadingErr}))
  const nav = useNavigate()

  useInit(() => {
    if (!user && localStorage.getItem('TOKEN') && !loadingErr) {
      store.get('profile').getProfile()
    }
  }, [], {backForward: false})

  const callbacks = {
    toLogin: useCallback(() => nav('/login'), [nav]),
    logOut: useCallback(() => store.get('profile').quit(), []),
  }

  return (
    <LayoutFlex flex='end' padding={false}>
      <Auth t={t} username={user?.profile.name} toLogin={callbacks.toLogin} logOut={callbacks.logOut} toProfile={'/profile'}/>
    </LayoutFlex>
  )
}

export default React.memo(LoginPanel);