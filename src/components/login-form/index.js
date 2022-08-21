import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function LoginForm() {
	const cn = bem('Form');

	return (
		<form>
			<label className={cn('label')}>
				<span>Логин</span>
				<input type="text"/>
			</label>
			<label className={cn('label')}>
				<span>Пароль</span>
				<input type="text"/>
			</label>
			<input type="submit" value="Войти"/>
		</form>
	)
}

export default LoginForm;