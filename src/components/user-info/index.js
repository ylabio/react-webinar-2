import React, { useCallback, useEffect } from 'react'
import Layout from '../layout';
import LayoutFlex from '../layout-flex';
import LoginButton from './../button-login/index';
import User from '../user';
import useSelector from './../../hooks/use-selector';
import useStore from './../../hooks/use-store';
import useTranslate from './../../hooks/use-translate';
import Tools from '../../containers/tools';
function UserInfo() {
    const store = useStore()
    const select = useSelector(state => ({
        error: state.user.user.error,
        user: state.user.user,
        token: state.user.user.token,

    }));

    const callbacks = {
        checkUser: useCallback((token) => store.get('user').checkUser(token), []),
        deleteUser: useCallback((token) => store.get('user').deleteUser(token), []),
    }
  
    useEffect(() => {
        callbacks.checkUser(localStorage.getItem('token'))
    }, [])

    const { t } = useTranslate()
    return (

        <Layout top={<LoginButton name={select.user.userName} deleteUser={callbacks.deleteUser} token={select.token} />} head={
            <LayoutFlex flex="between">
                <h1>{t('title')}</h1>
            </LayoutFlex>
        }>

            <Tools />
            <User user={select.user} />

        </Layout>
    )
}

export default React.memo(UserInfo)