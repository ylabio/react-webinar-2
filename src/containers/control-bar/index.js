
import React, { useCallback, useEffect, useState } from 'react'
import Bar from '../../components/bar'
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';

function ControlBar() {
  const store = useStore();
  const select = useSelector(state => ({
    isAuth: state.auth.isSigned,
    login: state.profile.name
  }));
  const [prevLink, setPrevLink] = useState()
  useEffect(() => {
    setPrevLink(window.location.href)
  }, [window.location.href])



  const callbacks = {
    logout: useCallback(() => store.get('auth').logout())
  }


  return (
    <Bar isAuth={select.isAuth} callback={callbacks.logout} login={select.login} prevLink={prevLink} />
  )
}

export default ControlBar
