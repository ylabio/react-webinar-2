import React, {useCallback, useEffect, useState} from 'react';
import {cn as bem} from "@bem-react/classname";
import FormInput from '../form_input';
import propTypes from 'prop-types';
import style from './style.css'


function Form(props) {
    const cn = bem('Form');
    const [token, setToken] = useState(null)

    const onSubmit = useCallback(event => {
       event.preventDefault()
       props.fetchLogin()
    }, [])

    useEffect(() => {
        setToken(localStorage.getItem('token')) 
    }, [props.result])
  

    return (
        <form
            onSubmit={onSubmit}
            className={cn()}>
            <h2>Вход {token ? 'выполнен' : null}</h2>
            {
                token 
                ? null
                : <>
                    <FormInput toInput={props.toLogin} label={'Логин'} type={'text'} value={props.login}/>
                    <FormInput toInput={props.toPassword} label={'Пароль'} type={'password'} value={props.password}/>
                    <p className={cn('error')}>{props.error}</p>
                    <button>Войти</button>
                </>
            }
        </form>
    );


}

Form.propTypes = {
    toLogin: propTypes.func.isRequired,
    toPassword: propTypes.func.isRequired,
    fetchLogin: propTypes.func.isRequired,
    login: propTypes.string.isRequired,
    password: propTypes.string.isRequired,
    error: propTypes.string,
    result: propTypes.object,
  }
  
Form.defaultProps = {
    toLogin: () => {},
    toPassword: () => {}, 
    fetchLogin: () => {},
    login: '',
    password: ''
}

export default React.memo(Form);
