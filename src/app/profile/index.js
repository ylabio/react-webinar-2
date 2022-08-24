import React, {useEffect} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import Layout from "../../components/layout";
import Header from "../../containers/header";
import UserCard from "../../components/user-card";

function Profile(){
  const store = useStore();

  const select = useSelector(state => ({
    name: state.profile.name,
    phone: state.profile.phone,
    email: state.profile.email,
    waiting: state.profile.waiting,
    error: state.profile.error
  }));

  const {t} = useTranslate();
  
  // Запрашиваем данные профиля
  // При выходе со страницы очищаем данные
  useEffect(() => {
    store.get('profile').loadUserData();
    return () => store.get('profile').clearUserData();
  }, []);
  
  // Если произошла ошибка, выводим сообщение
  if (select.error) {
    alert("Ошибка получения данных профиля: " + select.error);
    store.get('profile').clearUserData();
  }

  return (
    <Layout head={<Header title={t('title')}/>}>
      <Tools/>
      {/* Ждем подгрузки данных пользователя */}
      {!select.waiting && <UserCard name={select.name} phone={select.phone} email={select.email}/>}
    </Layout>
  )
}

export default React.memo(Profile);