import React from "react";
import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import "./style.css";

function LoginForm({onSubmit, onChange, form, error}) {
    const cn = bem('LoginForm');

    return (
        <div className={cn()}>
            <h2>Вход</h2>
            <form className={cn('form')} onSubmit={onSubmit}>
                <label htmlFor="login">Логин</label>
                <input
                    type="text"
                    id="login"
                    className={cn('input')}
                    name="login"
                    value={form.login}
                    onChange={onChange}
                />
                <label htmlFor="password">Пароль</label>
                <input
                    type="password"
                    id="password"
                    className={cn('input')}
                    name="password"
                    value={form.password}
                    onChange={onChange}
                />
                {error && <span className={cn('error')}>{error}</span>}
                <button
                    type="submit"
                    className={cn('btn')}
                    disabled={!(form.login && form.password)}
                >
                    Войти
                </button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    onSubmit: propTypes.func.isRequired,
    onChange: propTypes.func.isRequired,
    form: propTypes.object.isRequired,
    error: propTypes.string
}

export default React.memo(LoginForm)