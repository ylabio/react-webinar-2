import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Top from "../../components/top";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import { getUserDataFromLS } from "../../utils";

function TopContainer() {
  const store = useStore();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  const callbacks = {
    openLoginPage: useCallback(() => navigate('/login'), []),
    signOut: useCallback(() => {
      const token = getUserDataFromLS().token;
      (async () => {
        await store.get('auth').signOut(token);
        navigate('/login');
      })()
    }, []),
  };

  return (
    <Top 
      handleAuth={callbacks.openLoginPage}
      signOut={callbacks.signOut}
      userData={user?.profile?.name}
      link='/profile'  
    />
  );
}

export default React.memo(TopContainer);