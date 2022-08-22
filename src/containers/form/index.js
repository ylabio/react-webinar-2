import React, {useEffect, useState} from 'react';
import LoginInput from "../../components/login-input";
import useStore from "../../hooks/use-store";
import ErrorMessage from "../../components/error-message";
import useSelector from "../../hooks/use-selector";
import {useNavigate} from "react-router-dom";


const Form = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const store = useStore();
    const navigate = useNavigate();

    useEffect(() => {
        if(!(login === '' && password === '')) {
            store.get('auth').clearError();
        }
    }, [login, password])

    const select = useSelector(state => ({
        error: state.auth.error,
        isLoading: state.auth.isLoading
    }));
    const onSubmit = (e) => {
        e.preventDefault;
        const auth = async () => {
            await store.get('auth').auth(login, password).then(() => {
                navigate('/profile');
            });
        }
        auth();
    }
    return (
        <form>
            <LoginInput func={setLogin} type={'text'} label={'Логин'}/>
            <LoginInput func={setPassword} type={'password'} label={'Пароль'}/>
            <ErrorMessage message={select.error}/>
            <button onClick={(e) => onSubmit(e)} type={'button'}>
                Войти
            </button>
        </form>
    );
};

export default Form;