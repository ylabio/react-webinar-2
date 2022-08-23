import React, {useCallback} from "react";
import useSelector from "../../hooks/use-selector";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import useStore from "../../hooks/use-store";
import ProfileList from "../../components/profile-list";

function Profile(){

    const store = useStore();

    const select = useSelector(state => ({
        user: state.auth.user,
        error: state.auth.error,
        isAuth: state.auth.isAuth,
    }));

    const items = [
      {title : 'Имя', value: select.user.username}, 
      {title :'телефон', value : select.user.phone}, 
      {title :'email', value: select.user.email},]

    const callbacks = {
        // Закрытие любой модалки
        login: useCallback((login, password) => store.get('auth').login(login, password), []),
        logout: useCallback(()=>store.get('auth').logout(),[])
      };

    const {t} = useTranslate();

    return(
        <Layout isAuth={select.isAuth} userName={select.user.username} logout={callbacks.logout} head={
            <LayoutFlex flex="between">
              <h1>{t('title')}</h1>
              <LocaleSelect/>
            </LayoutFlex>
          }>
          <Tools />
           <ProfileList items={items}/>
          </Layout>
    )
}

export default React.memo(Profile)
