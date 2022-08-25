import React from 'react'
import Layout from '../../components/layout'
import LayoutFlex from '../../components/layout-flex'
import LocaleSelect from '../../containers/locale-select'
import Tools from '../../containers/tools'
import useSelector from '../../hooks/use-selector';
import { useCallback, useEffect } from 'react';
import useStore from '../../hooks/use-store';
import { Navigate } from 'react-router-dom';
import { ProfileInfo } from '../../components/profile-info'
import Spinner from '../../components/spinner'


export const Profile = () => {
  const select = useSelector(state => ({
    article: state.article.data,
    profile: state.profile.profile,
    waiting: state.auth.waiting

  }));
  return (
    <>
      <Layout head={
        < LayoutFlex flex="between" >
          <h1>{select.article.title}</h1>
          <LocaleSelect />
        </LayoutFlex >
      }>
        <Tools />
        <Spinner active={select.waiting === null}>
          <ProfileInfo
            profile={select.profile}
          />
        </Spinner>
      </Layout >
    </>
  )
}
