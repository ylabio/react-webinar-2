import React, { useCallback } from 'react'
import propTypes from 'prop-types';
import Layout from '../layout';
import LayoutFlex from '../layout-flex';
import LoginButton from './../button-login/index';
import User from '../user';
import useSelector from './../../hooks/use-selector';
import useStore from './../../hooks/use-store';
import { } from 'react';
import useTranslate from './../../hooks/use-translate';
import Tools from '../../containers/tools';
function UserInfo() {
    const store = useStore()
    const callbacks = {

        deleteUser: useCallback((token) => store.get('user').deleteUser(token), []),
    }
    const select = useSelector(state => ({
        error: state.user.user.error,
        user: state.user.user,
        token: state.user.user.token,
    }));
    const { t } = useTranslate()
    return (

        <Layout top={<LoginButton deleteUser={callbacks.deleteUser} token={select.token} />} head={
            <LayoutFlex flex="between">
                <h1>{t('title')}</h1>
            </LayoutFlex>
        }>

            <Tools />
            <User user={select.user} />

        </Layout>
    )
}
// UserInfo.propTypes = {
//     user: propTypes.object.isRequired
// }
export default UserInfo