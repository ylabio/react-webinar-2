import React, {useCallback} from "react";
import { useCookies } from "react-cookie";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import Authorization from "../../components/authorization";
import useStore from "../../hooks/use-store";

function LoginLogout() {

  const {lang, setLang, t} = useTranslate();

  const store = useStore();

  const select = useSelector(state => ({
    dataUser: state.authorization.dataUser
  }));

  //управление отображением в Authorization
  let user = '';
  if (select.dataUser?.profile?.name)
   user = select.dataUser.profile.name;

  //проверка авторизации
  let tokenCookie = document.cookie.match(/token=(.+?)(;|$)/);
  
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const callbacks = {
    //выход пользовтаеля
    logOut: useCallback(() => {store.get('authorization').logOut(tokenCookie[1]);
    setCookie("token", "");}, [])
  };

  return (
    <Authorization user={user} 
                     login={t('login')} 
                     logout={t('logout')}
                     loginUrl={'/login'}
                     profileUrl={'/profile'}
                     logOut={callbacks.logOut}
    />
  );
}

export default React.memo(LoginLogout);
