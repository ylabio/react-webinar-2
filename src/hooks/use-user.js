import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useSelector from './use-selector';

/**
 * Хук проверки состояния юзера. Если пользователь авторизован, то возвращаются его поля и прочее
 * Если не авторизован и задан параметр orRedirectTo, то переходим на страницу логина или еще кудато
 * @param options {{orRedirectTo}}
 */
export default function useUser(options = { orRedirectTo: '/login' }) {
  const navigate = useNavigate();
  const location = useLocation();

  const select = useSelector(state => ({
    user: state.session.user,
    exists: state.session.exists,
    waiting: state.session.waiting,
    errors: state.session.errors
  }));

  useEffect(() => {
    if (!select.exists && !select.waiting && options.orRedirectTo)
      navigate(options.orRedirectTo, { state: { back: location.pathname } });
  }, [select.exists, select.waiting]);

  return { user: select.user, exists: select.exists, waiting: select.waiting, errors: select.errors };
} 