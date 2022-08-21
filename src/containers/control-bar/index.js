
import React, { useCallback, useEffect } from 'react'
import Bar from '../../components/bar'
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';

function ControlBar() {
  const store = useStore();
  const select = useSelector(state => ({
    isAuth: state.auth.isSigned,
    login: state.auth.login
  }));
  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      store.get('profile').fetchProfile(localStorage.getItem('auth-token'))
    }
  }, [localStorage.getItem('auth-token')])

  const callbacks = {
    logout: useCallback(() => store.get('auth').logout())
  }


  return (
    <Bar isAuth={select.isAuth} callback={callbacks.logout} login={select.login} />
  )
}

export default ControlBar
