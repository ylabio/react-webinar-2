import React, { useState, useCallback } from 'react'
import Tools from '../../containers/tools'
import useStore from '../../hooks/use-store'
import useTranslate from '../../hooks/use-translate'
import LoginButton from '../button-login'
import Layout from '../layout'
import LayoutFlex from '../layout-flex'
import LoginForm from './form-login'
import useSelector from '../../hooks/use-selector'
function Login() {
    const store = useStore()
    const select = useSelector(state => ({
        error: state.user.user.error,
        token: state.user.user.token,
        name: state.user.user.userName,
        user: state.user.user,
        auth: state.user.user.auth,
    }));
    const [data, setData] = useState({
        login: '',
        password: '',
    })
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const callbacks = {
        loginUser: useCallback((data) => {
            store.get('user').loginUser(data)
            setData({
                login: '',
                password: '',
            })
        }, []),
        exitUser: useCallback((token) => store.get('user').exitUser(token), []),
        deleteUser: useCallback((token) => store.get('user').deleteUser(token), []),
        resetError:useCallback(() => store.get('user').resetError(), []),
    };
    const { t } = useTranslate()
    return (

        <Layout top={<LoginButton name={select.name} deleteUser={callbacks.deleteUser} token={select.token} />} head={
            <LayoutFlex resetError={callbacks.resetError} flex="between">
                <h1>{t('title')}</h1>
            </LayoutFlex>
        }>
            <Tools />
            <LoginForm
                user={select.user}
                auth={select.auth}
                error={select.error}
                loginUser={callbacks.loginUser}
                exitUser={callbacks.exitUser}
                token={select.token}
                deleteUser={callbacks.deleteUser}
                data={data}
                handleChange={handleChange}
                onNavigateProfile={callbacks.onNavigateProfile}
            />
        </Layout>

    )
}

export default Login