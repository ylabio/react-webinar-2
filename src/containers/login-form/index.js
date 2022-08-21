import React, { useCallback } from "react";
import Input from "../../components/input";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import "./style.css";

function LoginForm() {

    const store = useStore();


    const select = useSelector(state => ({
        login: state.authorization.login,
        password: state.authorization.password,
        error: state.authorization.error
    }));


    const callbacks = {
        LoginInput: useCallback(login => store.get('authorization').setUser({ login }), []),
        PasswordInput: useCallback(password => store.get('authorization').setUser({ password }), []),
        LoginUser: useCallback(event => store.get('authorization').userAuthorization(event), [])

    };



    return (<div className="login-container">
        <h2>Вход</h2>
        <form className="login-form">
            <label className="login-label">Логин</label>
            <Input onChange={callbacks.LoginInput} value={select.login} theme="default" type="text" required />
            <label className="password-label">Пароль</label>
            <Input onChange={callbacks.PasswordInput} value={select.password} theme="default" type="password" required />

            <p className="error" >{select.error}</p>

            <button className="login-button" onClick={callbacks.LoginUser} type="submit">Войти</button>

        </form>
    </div>);
}



export default React.memo(LoginForm);