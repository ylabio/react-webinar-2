import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import TextField from '../text-field';

function LoginForm() {
	const cn = bem('LoginForm');

	function handleSubmit(e) {
		e.preventDefault();
		console.log('ok');
	}

	return (
		<div className={cn()}>
			<h2 className={cn('title')}>Вход</h2>
			<form>
				<TextField label='Логин' theme='md' />
				<TextField label='Пароль' type='password' theme='md' />
				<button className={cn('button')} onClick={handleSubmit}>
					Войти
				</button>
			</form>
		</div>
	);
}

LoginForm.propTypes = {};

LoginForm.defaultProps = {};

export default React.memo(LoginForm);
