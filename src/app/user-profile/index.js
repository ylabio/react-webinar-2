import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useCheckToken from '../../hooks/use-check-token';
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import UserInfo from "../../components/user-info";
import { LineWave } from 'react-loader-spinner'


function UserProfile() {

  const navigate = useNavigate();
  const { t } = useTranslate();

  const { auth: { userInfo: { name, phone, email }, isAuth } } = useSelector(state => ({
    auth: state.auth,
  }));

  // check token
  useCheckToken('token');


  useEffect(() => {
    if (!isAuth) navigate('/login');
  }, [isAuth]);

  return (
    <Layout
      head={
        <LayoutFlex flex="between">
          <h1>{t('title')}</h1>
          <LocaleSelect />
        </LayoutFlex>}
    >
      <Tools />
      <UserInfo
        name={name}
        phone={phone}
        email={email}
      />
    </Layout>
  )
}

export default React.memo(UserProfile);
