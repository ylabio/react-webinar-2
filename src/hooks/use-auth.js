import useSelector from './use-selector';
/*
 * Хук для получения данных авторизации
 */
export const useAuth = () => {
  const {user, token, message} = useSelector((state) => state.user);
  return {
    isAuth: !!token,
    user,
    token,
    message
  }
};