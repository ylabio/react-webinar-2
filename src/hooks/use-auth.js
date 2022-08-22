import useSelector from './use-selector';

const useAuth = () => {
  const { user, token, error } = useSelector((state) => state.user);
  return {
    isAuth: !!token,
    user: user,
    token: token,
    error: error,
  };
};

export default useAuth;
