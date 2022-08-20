import React from 'react';
import LayoutFlex from '../../components/layout-flex';
import LoginForm from '../../components/login-form';

function Login() {
	return (
		<LayoutFlex flex='start'>
			<LoginForm />
		</LayoutFlex>
	);
}

export default React.memo(Login);
