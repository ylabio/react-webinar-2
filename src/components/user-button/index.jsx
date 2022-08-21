import React, { useCallback, useEffect } from 'react'
import { Button } from './button';
import useStore from './../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Cookies from 'js-cookie';
import { useMemo } from 'react';

export const UserButton = () => {

  const store = useStore();

  const select = useSelector(state => ({
    profile: state.auth.profile.profile,
  }));

  const callbacks = {
    logout: useCallback(() => store.get('auth').logout(), []),
    me: useCallback(() => store.get('auth').me(), []),

  };
  useEffect(() => {
    callbacks.me()
  }, [])

  const auth = useMemo(() => {
    if (!!Cookies.get('token')) { return true }
    else return false
  })

  const onClick = () => {
    callbacks.logout()
  }
  return (
    <div style={{height:'40px',display:'flex',alignItems:'center',textAlign:'center',justifyContent:'flex-end'}}>
      <Button
        loginPath={`/login`}
        profilePath={`/profile`}
        onClick={onClick}
        profile={select.profile}
        auth={auth}

      />
    </div>
  )
}
