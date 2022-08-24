import { useEffect } from 'react';
import useStore from './use-store';
import { useNavigate } from "react-router-dom";
import useSelector from '../hooks/use-selector';

/**
 * Проверка наличия и актуальности ключа в localStorage
 * @param {*} key - ключ значения в localStorage
 * @param {*} deps - зависимости
 */
function useToken(key = '', deps= []) {
  console.log('useToken');
  const store = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem(key);    
      // Если токен есть проверяем его статус
      if (data) {
        const {token} = JSON.parse(data);
        store.get('auth').loadAuthorizationData(token)
          .then(() => {
            console.log('getProfile выполнен', store.getState().auth.error)
            if (store.getState().auth.error) {
              navigate('/login');
            }
          });
      } else {
        navigate('/login');
      }
  }, deps);
}

export default useToken;
