import React, {useCallback} from 'react'
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import Header from "../../components/header";

function HeaderContainer() {
  const store = useStore();

  const select = useSelector(state => ({
    user: state.auth.user,
    isAuth: state.auth.token
  }));

  const callbacks = {
    logout: useCallback(() => store.get('auth').logout(), [])
  };

  return (
    <Header logout={callbacks.logout} isAuth={select.isAuth} user={select.user}/>
  )
}

export default HeaderContainer