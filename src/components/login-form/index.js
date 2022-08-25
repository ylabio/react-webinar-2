import React from "react";
import useTranslate from "../../hooks/use-translate";
import './style.css';
import {cn as bem} from "@bem-react/classname";


function LoginForm(props){
    const cn = bem('LoginForm');
    const {t} = useTranslate();
    let formToSend = {}

    const onChangeHandler = (event) => {
        const fieldName = event.target.name
        const fieldValue = event.target.value
        formToSend = {...formToSend, [fieldName] :  fieldValue}
    }


    const onSubmitHandler = (event) => {
        event.preventDefault();
        props.login(formToSend);
        props.goProfile();
    }

    return(
        <div className={cn()}>
            <h2>{t("enetrance")}</h2>
            <form onSubmit={onSubmitHandler}>
            <div className={cn('input')}>
                <div>{t('login')}</div>
                <input type={'text'} onChange={onChangeHandler} name={"login"}/>
            </div>
            <div className={cn('input')}>
                <div>{t('pass')}</div>
                <input type={'password'}  onChange={onChangeHandler} name={"password"} autoComplete="false"/>
            </div>
            {props.error
            ?<div className={cn('error')}>Неверный логин или пароль</div>
            : null}
            <input type={'submit'} value={t('enter')}></input>
            </form>
        </div>
    )
}

export default React.memo(LoginForm)