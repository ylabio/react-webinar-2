import { useNavigate } from 'react-router-dom';
import useAuth from './use-auth';
import useInit from './use-init';
import useStore from './use-store';

const useCheckAuth = () => {
  const store = useStore();
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useInit(
    async () => {
      await store.get('user').checkAuth();
      isAuth ? navigate('/profile') : navigate('/login');
    },
    [isAuth],
    { backForward: true }
  );
};

export default useCheckAuth;
