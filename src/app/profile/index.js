import React from "react";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import Layout from "../../components/layout";
import Header from "../../containers/header";
import UserCard from "../../components/user-card";

function Profile(){
  const select = useSelector(state => ({
    user: state.auth.user
  }));

  const {t} = useTranslate();

  return (
    <Layout head={<Header title={t('title')}/>}>
      <Tools/>
      {/* Ждем подгрузки данных пользователя если профайл открыт по прямой ссылке */}
      {select.user && <UserCard name={select.user.profile.name} phone={select.user.profile.phone} email={select.user.email}/>}
    </Layout>
  )
}

export default React.memo(Profile);