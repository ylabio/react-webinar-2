import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useSelector from './use-selector';

/**
 * Хук проверки состояния юзера. Если пользователь авторизован, то возвращаются его поля, токен и прочее
 * Если не авторизован и задан параметр orRedirectTo, то переходим на страницу логина или еще кудато
 * @param options {{orRedirectTo}}
 */
export default function useUser(options = { orRedirectTo: '/login' }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const select = useSelector(state => ({
    fields: state.user.fields,
    token: state.user.token,
    waiting: state.user.waiting,
    error: state.user.error
  }));

  useEffect(() => {
    if (!select.token && options.orRedirectTo)
      navigate(options.orRedirectTo, { state: { from: location } });
  }, [select.token]);

  return { fields: select.fields, token: select.token, waiting: select.waiting, error: select.error };
}