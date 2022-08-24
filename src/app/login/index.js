import React, {useCallback, useEffect, useState} from "react";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import Tools from "../../containers/tools";
import LoginForm from "../../components/login-form";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import {useNavigate} from "react-router-dom";

function Login() {
    const history = useNavigate()
    const store = useStore()
    const [form, setForm] = useState({login: '', password: ''})
    const select = useSelector(state => ({
        error: state.auth.data.error,
        name: state.user.profile.name
    }))

    useEffect(() => {
        if(select.name && !select.error){
            history(-1)
        }
    }, [select.name, select.error])

    const callbacks = {
        onSubmit: useCallback((e) => {
            e.preventDefault()
            store.get('auth').login(form)
        }, [form]),
        onChange: useCallback((e) => {
            setForm(prevState => ({
                ...prevState,
                [e.target.name]: e.target.value
            }))
        }, [])
    }

    return (
        <Layout head={
            <LayoutFlex flex="start">
                <h1>Магазин</h1>
            </LayoutFlex>
        }>
            <Tools/>
            <LayoutFlex flex="start">
                <LoginForm onSubmit={callbacks.onSubmit} onChange={callbacks.onChange} form={form}
                           error={select.error}/>
            </LayoutFlex>
        </Layout>
    )
}

export default React.memo(Login)