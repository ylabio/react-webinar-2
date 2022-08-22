import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileForm from "../../components/forms/profile-form";
import Layout from "../../components/layouts/layout";
import LayoutFlex from "../../components/layouts/layout-flex";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import Tools from "../../containers/tools";
import UserBar from "../../containers/user-bar";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";

function Profile() {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const select = useSelector(state => ({
    fields: state.user.fields,
    waiting: state.user.waiting,
    token: state.user.token
  }));

  // проверяем токен 
  useEffect(() => {
    if (!select.token)
      navigate('/login');
  }, [select.token]);

  //console.log(select.fields);
  return (
    <Layout
      head={
        <LayoutFlex flex="between">
          <h1>{t('title')}</h1>
          <LocaleSelect />
        </LayoutFlex>
      }
      top={
        <UserBar />
      }>
      <Tools />
      <Spinner active={select.waiting}>
        {select.fields ? <ProfileForm fields={select.fields} t={t} /> : null}
      </Spinner>
    </Layout>
  )
};

export default React.memo(Profile);
