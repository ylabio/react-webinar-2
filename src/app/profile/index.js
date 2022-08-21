import React, {useEffect, useState} from "react";
import useTranslate from "../../hooks/use-translate";
import PageTemplate from "../../components/page-template";
import ProfileInfo from "../../components/profile-info";
import useSelector from "../../hooks/use-selector";
import {useNavigate} from "react-router-dom";
import Spinner from "../../components/spinner";

function Profile() {

  const select = useSelector(state => ({
    user: state.login.user,
    isLoading: state.login.isLoading,
    loadingError: state.login.loadingError
  }));

  const {t} = useTranslate();
  const navigate = useNavigate();

  useEffect(() => {
    if (!(select.user || select.isLoading) || !localStorage.getItem('TOKEN') || select.loadingError) {
      navigate('/login')
    }
  }, [select.user, select.loadingError, select.isLoading, navigate])

  return (
    <PageTemplate title={t('title')}>
      <Spinner active={select.isLoading}>
        <ProfileInfo t={t} user={select.user}/>
      </Spinner>
    </PageTemplate>
  )
}

export default React.memo(Profile);
