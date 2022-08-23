import React, { useCallback, useEffect } from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types';
import './style.css';
import useInput from '../../hooks/useInput';

function LoginForm(props) {
	const cn = bem('Form');

	const login = useInput('');
	const password = useInput('');

	const callbacks = {
    onAuthorization: useCallback((e) => {
			e.preventDefault();
			if(login.value && password.value) {
				props.onAuthorization(login.value, password.value);

				login.setValue('');
				password.setValue('');
			}
		}, [login.value, password.value, props.onAuthorization]),
  };

	return (
		<form>
			<label className={cn('label')}>
				<span>{props.t("form.login")}</span>
				<input type="text" {...login}/>
			</label>
			<label className={cn('label')}>
				<span>{props.t("form.password")}</span>
				<input type="password" {...password}/>
			</label>
			<div className={cn('error')}>{props.authError}</div>
			<input type="submit" value={props.t("form.submit")} onClick={callbacks.onAuthorization}/>
		</form>
	)
}

LoginForm.propTypes = {
  authError: propTypes.string,
	isAuth: propTypes.bool,
	t: propTypes.func
}

LoginForm.defaultProps = {
	authError: '',
	isAuth: false,
	t: (text) => tetx
}

export default React.memo(LoginForm);