import React, {useCallback} from 'react'
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import Header from "../../components/header";

function HeaderContainer() {
  const store = useStore();

  const select = useSelector(state => ({
    user: state.profile.user,
    token: state.profile.token
  }));

  const callbacks = {
    logout: useCallback(() => store.get('profile').logout(), [])
  };

  return (
    <Header logout={callbacks.logout} token={select.token} user={select.user}/>
  )
}

export default HeaderContainer