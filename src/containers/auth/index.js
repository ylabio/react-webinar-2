import React, {useCallback} from "react";
import useSelector from "../../hooks/use-selector";
import {Link, useLocation} from "react-router-dom";
import CabinetSimple from "../../components/cabinet-simple";
import LayoutFlex from "../../components/layout-flex";
import useAuth from "../../hooks/use-auth";
import useStore from "../../hooks/use-store";

function Auth(){
  const store = useStore();
  const {isAuth} = useAuth();
  const location = useLocation();

  const select = useSelector(state => ({
    profile: state.user.profile,
  }));

  const callbacks = {
    onLogout: useCallback(()=>store.get('user').setLogOut(),[])
    }
  
    return (
      !isAuth && <LayoutFlex flex='end' padding={false}>
        <Link to='/login' state={{from: location}}><button>Вход</button></Link>
      </LayoutFlex>
      || <CabinetSimple profile={select.profile} onLogout={callbacks.onLogout}/>
    )
}

export default React.memo(Auth);
