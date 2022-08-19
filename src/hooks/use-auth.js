import useSelector from './use-selector';

export const useAuth = () => {
  const {login,id, token, isAuth} = useSelector((state) => state.auth);
	return {
		isAuth: !!login,
		login,
		id,
		token
	}
};
