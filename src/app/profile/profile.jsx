import React from 'react'
import Layout from '../../components/layout'
import LayoutFlex from '../../components/layout-flex'
import LocaleSelect from '../../containers/locale-select'
import Tools from '../../containers/tools'
import useSelector from '../../hooks/use-selector';
import { useCallback, useMemo } from 'react';
import useStore from '../../hooks/use-store';
import { Navigate, useNavigate } from 'react-router-dom';
import { ProfileInfo } from '../../components/profile-info'
import Cookies from 'js-cookie';

export const Profile = () => {
  const navigate = useNavigate()
  const store = useStore();
  const select = useSelector(state => ({
    article: state.article.data,
    profile:state.auth.profile

  }));
  const callbacks = {
  

  };

  const auth = useMemo(() => {
    if (!!Cookies.get('token')) { return true }
    else return false
  })
  return (
    <>
       {
      auth 
      ?
      <Layout head={
        < LayoutFlex flex="between" >
          <h1>{select.article.title}</h1>
          <LocaleSelect />
        </LayoutFlex >
      }>
        <Tools />
        <ProfileInfo
        profile={select.profile}
        />
      </Layout >
      : <Navigate replace to="/login" />
    }
    </>
  )
}
