import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import useSelector from './use-selector';

/**
 * Хук для проверки авторизации. Если токен существует, хук ничего не делает. Если нет - отправляет пользователя назад
 */
export default function useAuth() {
  const navigate = useNavigate()
  const authToken = useSelector(state => state.auth.token);
  useEffect(() => {
    if(!authToken) navigate("/login")
  }, [authToken]);
}
