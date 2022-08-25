import React from "react";
import "./style.css";

function LoginFields({ error, renderInputs, loginUser }) {



    return (<div className="login-container">
        <h2>Вход</h2>
        <form className="login-form">
            <label className="login-label">Логин</label>
            {renderInputs.LoginInputElement()}
            <label className="password-label">Пароль</label>
            {renderInputs.PasswordInputElement()}
            <p className="error" >{error}</p>
            <button className="login-button" onClick={loginUser} type="submit">Войти</button>

        </form>
    </div>)

}


export default React.memo(LoginFields);