import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Input from '../input';

function LoginForm() {
	const cn = bem('LoginForm');

	return (
		<div className={cn()}>
			<h2>Вход</h2>
			<form>
				<Input />
			</form>
		</div>
	);
}

LoginForm.propTypes = {};

LoginForm.defaultProps = {};

export default React.memo(LoginForm);
