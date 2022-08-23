import React from "react";
import useTranslate from "../../hooks/use-translate";
import PageTemplate from "../../containers/page-template";
import ProfileInfo from "../../components/profile-info";
import useSelector from "../../hooks/use-selector";
import Spinner from "../../components/spinner";
import AuthCheck from "../../containers/auth-check";

function Profile() {

  const select = useSelector(state => ({
    user: state.session.user,
    isLoading: state.session.isLoading
  }));

  const {t} = useTranslate();

  return (
    <AuthCheck>
      <PageTemplate title={t('title')}>
        <Spinner active={select.isLoading}>
          <ProfileInfo t={t} user={select.user}/>
        </Spinner>
      </PageTemplate>
    </AuthCheck>
  )
}

export default React.memo(Profile);
