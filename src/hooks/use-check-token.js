import { useEffect } from 'react';
import useStore from "./use-store";

/**
 * Проверка token и обновление 
 * @param token - token в localStorage
 * @param deps - зависимости
 */
function useCheckToken(token = '', deps = []) {

    const store = useStore();

    useEffect(() => {
        const data = localStorage.getItem(token);

        if (data) {
            const { token } = JSON.parse(data);
            store.get('auth').getProfile(token);
        }
    }, deps)
}

export default useCheckToken;
