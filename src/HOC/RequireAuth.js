import React from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import useInit from "../hooks/use-init";
import useSelector from "../hooks/use-selector";
import useStore from "../hooks/use-store";

const RequireAuth = ({children}) =>{
    const store = useStore();

    const select = useSelector(state => ({
        auth: state.auth.isLogin,
      }));

    useInit(async () => {
        await store.get('auth').initUser();
      }, []);

      // const location = useLocation()
      // console.log(location)

   
    if(!select.auth) {
        return <Navigate replace to={"/login"}/>
      }

    return children;

}

export default React.memo(RequireAuth);