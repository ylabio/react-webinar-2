import { useCallback } from "react";
import useSelector from "./use-selector";
import useStore from "./use-store";

//хук для проверки статуса авторизации
export default function useAuth(){
    const store = useStore();

    const select =  useSelector(state => ({
        isAuth: state.auth.isAuth,
        username: typeof state.profile.user === 'undefined' ? null : state.profile.user.username
    }));

    const callbacks = {
        logout: useCallback(() => store.get('auth').logout(),[]),
        initAuth: useCallback(() => store.get('auth').logout(), [])
    }

    return {
        isAuth: select.isAuth, 
        username: select.username,
        logout: callbacks.logout,
        initAuth: callbacks.initAuth
    }

}