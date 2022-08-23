import {useEffect} from 'react';
import useStore from "./use-store";

/**
 * Проверка наличия и актуальности ключа в localStorage
 * @param {*} key - ключ значения в localStorage
 * @param {*} deps - зависимости
 */
function useToken(key = '', deps = []) {
  const store = useStore();
  useEffect(() => {
    const data = localStorage.getItem(key);
    // Если токен есть проверяем его статус
    if (data) {
      const {token} = JSON.parse(data);
      store.get('auth').getProfile(token);
    }
  }, deps)
}

export default useToken;
