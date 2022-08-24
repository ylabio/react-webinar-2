import Controls from "components/controls";
import React, {useCallback} from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import {useNavigate} from 'react-router-dom';

function Header() {

  const store = useStore();
  const navigate = useNavigate();


  const select = useSelector(state => ({
    isLogin: state.auth.isLogin,
    userName: state.auth.username,
    waiting: state.auth.waiting,
  }));

  const callbacks = {
    onLogin: useCallback(() => navigate('/login'), []),
    onLogout: useCallback(() => store.get('auth').logout(), []),
    onProfile: useCallback(() => navigate('/profile'), []),
  };

  return (
    <Controls isLogin={select.isLogin} onLogin={callbacks.onLogin}
              onLogout={callbacks.onLogout} onProfile={callbacks.onProfile}
              link={`/profile`} userName={select.userName}/>
  );
}

export default React.memo(Header);
