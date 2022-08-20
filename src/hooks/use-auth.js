import useSelector from './use-selector';

export const useAuth = () => {
  const {user, token, message} = useSelector((state) => state.auth);
	return {
		isAuth: !!token,
		user,
		token,
		message
	}
};
