import { useEffect } from 'react';
import useStore from "./use-store";

/**
 * Проверка token и обновление 
 * @param token - token в localStorage
 * @param deps - зависимости
 */
function useLogin(login = '', deps = []) {
    console.log("LOGIN OUTSIDE OF EFFECT")
    const store = useStore();

    useEffect(() => {

        console.log("LOGIN")
        const { token } = localStorage.getItem(login);

        if (token) {
            const userAuth = JSON.parse(data);
        }
    }, deps)
}

export default useLogin;
