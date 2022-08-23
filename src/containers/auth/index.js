import React, {useCallback} from "react";
import { Link } from "react-router-dom";
import CabinetSimple from "../../components/cabinet-simple";
import LayoutFlex from "../../components/layout-flex";
import useAuth from "../../hooks/use-auth";
import useStore from "../../hooks/use-store";

function Auth(){
  const store = useStore();
  const {isAuth, profile} = useAuth();

  const callbacks = {
    onLogout: useCallback(()=>store.get('user').setLogOut(),[])
    }
  
    return (
      !isAuth && <LayoutFlex flex='end' padding={false}>
        <Link to='/login'><button>Вход</button></Link>
      </LayoutFlex>
      || <CabinetSimple profile={profile} onLogout={callbacks.onLogout}/>
    )
}

export default React.memo(Auth);