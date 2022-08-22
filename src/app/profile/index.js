import React from "react";
import { Navigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import Layout from "../../components/layout";
import Header from "../../containers/header";
import UserCard from "../../components/user-card";

function Profile(){
  const select = useSelector(state => ({
    user: state.auth.user,
    token: state.auth.token
  }));

  const {t} = useTranslate();
  
  // Проверяем, авторизован ли пользователь, если нет то редиректим на логин
  if (select.token) {
    return (
      <Layout head={<Header title={t('title')}/>}>
        <Tools/>
        {/* Ждем подгрузки данных пользователя если есть токен и профайл открыт по прямой ссылке */}
        {select.user && <UserCard name={select.user.profile.name} phone={select.user.profile.phone} email={select.user.email}/>}
      </Layout>
    )
  } else return <Navigate to="/login" replace={true}/>
}

export default React.memo(Profile);