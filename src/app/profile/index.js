import React from "react";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import Layout from "../../components/layout";
import Header from "../../containers/header";
import UserCard from "../../components/user-card";

function Profile(){
  const select = useSelector(state => ({
    name: state.profile.name,
    phone: state.profile.phone,
    email: state.profile.email
  }));

  const {t} = useTranslate();

  return (
    <Layout head={<Header title={t('title')}/>}>
      <Tools/>
      {/* Ждем подгрузки данных пользователя если профайл открыт по прямой ссылке */}
      {select.name && <UserCard name={select.name} phone={select.phone} email={select.email}/>}
    </Layout>
  )
}

export default React.memo(Profile);