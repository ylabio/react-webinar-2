import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import useSelector from './use-selector';


//Хук для проверки токена

export default function useAuth() {
  const navigate = useNavigate()
  const authToken = useSelector(state => state.auth.token);
  useEffect(() => {
    if(!authToken) navigate("/login")//переход на форму логина если нет токена
  }, [authToken]);
}