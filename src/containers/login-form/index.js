import React, { useCallback } from "react";
import Input from "../../components/input";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import LoginFields from "../../components/login-fields";

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

    const renders = {
        LoginInputElement: useCallback(() => (<Input onChange={callbacks.LoginInput} value={select.login} theme="default" type="text" />), [callbacks.LoginInput, select.login]),
        PasswordInputElement: useCallback(() => (<Input onChange={callbacks.PasswordInput} value={select.password} theme="default" type="password" />), [callbacks.PasswordInput, select.password])

    };



    return (<LoginFields loginUser={callbacks.LoginUser} error={select.error} renderInputs={renders} />)
}



export default React.memo(LoginForm);