import React, {useState, useCallback} from "react"
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import {cn as bem} from '@bem-react/classname';
import "./style.css"

const LoginForm = () => {
	const store = useStore();
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const cn = bem("LoginForm");

	const error = useSelector((state) => state.profile.error);

	const onSubmit = (e) => {
		e.preventDefault();
		store.get("profile").login(login, password);
	}

	return (
		<div className={cn()}>
			<div className={cn("header")}>Вход</div>
			<form onSubmit={onSubmit}>

				<label htmlFor="login" className={cn("label")}>
					Логин
					<input id="login" value={login} onChange={(e) => setLogin(e.currentTarget.value)}/>
				</label>

				<label htmlFor="password" className={cn("label")}>
					Пароль
					<input id="password" type="password" value={password} onChange={(e) => setPassword(e.currentTarget.value)}/>
				</label>

				{error
					? <div className={cn("error")}>{error}</div>
					: null
				}

				<button type="submit" className={cn("submit")}>Войти</button>
			</form>
		</div>
	)
}

export default React.memo(LoginForm);