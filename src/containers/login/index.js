import React, { useCallback } from 'react';
import LayoutFlex from '../../components/layout-flex';
import LoginForm from '../../components/login-form';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';

function Login() {
	const store = useStore();

	const { error } = useSelector((state) => ({
		error: state.user.error,
	}));

	const callbacks = {
		onLogin: useCallback((data) => store.get('user').login(data), []),
	};

	return (
		<LayoutFlex flex='start'>
			<LoginForm
				onLogin={callbacks.onLogin}
				login={callbacks.login}
				error={error}
			/>
		</LayoutFlex>
	);
}

export default React.memo(Login);
