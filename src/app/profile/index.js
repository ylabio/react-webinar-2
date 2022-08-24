import React, {useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";
import Tools from "../../containers/tools";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import ProfilePage from "../../components/profile-page";

function Profile() {
  const navigate = useNavigate();

  const select = useSelector(state => ({
    user: state.profile.data,
    authorized: state.user.authorized,
    waiting: state.user.waiting
  }));

  const {t} = useTranslate();

  useEffect(() => {
    if (!select.authorized) {navigate('/login')}
  }, [])

  if (select.authorized) {
    return (
      <Layout head={
        <LayoutFlex flex="between">
          <h1>{t('title')}</h1>
          <LocaleSelect/>
        </LayoutFlex>
      }>
        <Tools/>
        <Spinner active={select.waiting}>
          <ProfilePage
            t={t}
            user={select.user}
          />
        </Spinner>
      </Layout>
    )
  }
}

export default React.memo(Profile);
