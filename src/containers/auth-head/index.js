import React, { useCallback } from 'react';
import AuthAction from '../../components/auth-action';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';

function AuthHead() {
	const store = useStore();

	const { isAuth, user } = useSelector((state) => ({
		isAuth: state.user.isAuth,
		user: state.user.user,
	}));

	const callbacks = {
		onLogout: useCallback(() => store.get('user').logout(), []),
	};

	return (
		<AuthAction isAuth={isAuth} user={user} onLogout={callbacks.onLogout} />
	);
}

export default React.memo(AuthHead);
