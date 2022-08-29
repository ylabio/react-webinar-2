import React from 'react'
import Layout from '../../layout'
import LayoutFlex from '../../layout-flex'
import Tools from '../../../containers/tools'
import LoginButton from '../../button-login';
import User from '../../user';
function UserInfoMenu({name,t,deleteUser,token,user}) {

  return (
    <Layout top={<LoginButton name={name} deleteUser={deleteUser} token={token} />} head={
        <LayoutFlex flex="between">
            <h1>{t('title')}</h1>
        </LayoutFlex>
    }>

        <Tools />
        <User user={user} />

    </Layout>
  )
}

export default UserInfoMenu