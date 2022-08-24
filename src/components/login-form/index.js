import React, {useEffect, useState} from 'react';
import {cn as bem} from '@bem-react/classname'
import './style.css';

const LoginForm = (props) => {
    const cn = bem('LoginForm');

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState('');

    const changeLogin = (e) => {
            e.preventDefault();
            setLogin(e.target.value)
    }

    const changePassword = (e) => {
        e.preventDefault();
        setPassword(e.target.value)
    }

    const doLogIn = (login, password) => {
        if(login.trim() === '' || password.trim() === '') {
                        return setErr('Поля не должны быть пустыми')
                    }else {
            return props.logIn({
                "login": `${login}`,
                "password": `${password}`,
            })
        }
    }

    useEffect(()=> {
        setPassword('')
        setLogin('')
    }, [])
    return (
        <div className={cn()}>
            <div className={cn('title')}>{props.t('panel.enter')}</div>
            <form onSubmit={(e)=> e.preventDefault()}>
                <label>
                    {props.t('form.login')}
                    <input type="text" autoComplete="on" onChange={changeLogin} />
                </label>
                <label>
                    {props.t('form.pass')}
                    <input type="password" autoComplete="on" onChange={changePassword} />
                </label>
                <div className={cn('err')}>
                    {props.err ? props.err : err}
                </div>
                <button onClick={()=>doLogIn(login, password)}>Войти</button>
            </form>
        </div>
    );
};

export default LoginForm;