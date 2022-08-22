import useSelector from "./use-selector";

/**
 * Хук возвращает статус аутентификации и токен
 */
export default function useAuth() {

  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const token = useSelector(state => state.auth.token)

  return [isAuth, token];
}
