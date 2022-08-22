import React, {useCallback, useState} from 'react';
import {cn as bem} from '@bem-react/classname'
import './style.css';

const LoginForm = (props) => {
    const cn = bem('LoginForm');

    const [err, setErr] = useState('');

    const callbacks = {
        logIn: useCallback((e) => {
            e.preventDefault();

            if(e.target[0].value.trim() === '' || e.target[1].value.trim() === '') {
                return setErr('Поля не должны быть пустыми')
            }

            // Функция принимающая логин и пароль с инпутов
            return props.logIn({
                "login": `${e.target[0].value}`,
                "password": `${e.target[1].value}`,
            })
        }, []),
    };
    return (
        <div className={cn()}>
            <div className={cn('title')}>{props.t('panel.enter')}</div>
            <form onSubmit={callbacks.logIn}>
                <label>
                    {props.t('form.login')}
                    <input type="text" autoComplete="on" />
                </label>
                <label>
                    {props.t('form.pass')}
                    <input type="password" autoComplete="on" />
                </label>
                <div className={cn('err')}>
                    {
                        err ? err
                            : props.err !== '' ? `  ${props.err == "TypeError: Cannot read properties of undefined (reading 'token')" ? 'Неверный логин или пароль' : 'Ошибка'}` : null
                    }
                </div>
                <button>Войти</button>
            </form>
        </div>
    );
};

export default LoginForm;