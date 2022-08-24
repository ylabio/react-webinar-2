import useSelector from './use-selector';
/*
 * Хук для получения данных авторизации
 */
export const useAuth = () => {
  const {username, token, message} = useSelector((state) => state.auth);
  return {
    isAuth: !!token,
    username,
    token,
    message
  }
};