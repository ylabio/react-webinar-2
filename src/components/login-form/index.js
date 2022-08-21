import React, { useState } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import TextField from '../text-field';

function LoginForm({ onLogin, error }) {
	const cn = bem('LoginForm');

	const [user, setUser] = useState({ login: '', password: '' });

	const { login, password } = user;

	const handleChangeInput = (event) => {
		const { name, value } = event.target;
		setUser({ ...user, [name]: value });
	};

	function handleSubmit(event) {
		event.preventDefault();
		onLogin(user);
	}

	return (
		<div className={cn()}>
			<h2 className={cn('title')}>Вход</h2>
			<form onSubmit={handleSubmit}>
				<TextField
					id='login'
					label='Логин'
					name='login'
					value={login}
					onChange={handleChangeInput}
				/>
				<TextField
					id='password'
					label='Пароль'
					type='password'
					name='password'
					value={password}
					onChange={handleChangeInput}
				/>
				{error.length !== 0 && <div className={cn('error')}>{error}</div>}
				<button className={cn('button')} type='submit'>
					Войти
				</button>
			</form>
		</div>
	);
}

LoginForm.propTypes = {
	onLogin: propTypes.func.isRequired,
	error: propTypes.string.isRequired,
};

LoginForm.defaultProps = {
	onLogin: () => {},
	error: '',
};

export default React.memo(LoginForm);
