import React, {useCallback} from "react";
import { useCookies } from "react-cookie";

import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";

import Authorization from "../../components/authorization";
import Spinner from "../../components/spinner";

function LoginLogout() {

  const {lang, setLang, t} = useTranslate();

  const store = useStore();

  const select = useSelector(state => ({
    dataUser: state.userinfo.dataUser,
    tokenUser: state.authorization.token,
    waiting: state.authorization.waiting
  }));

  //управление отображением в Authorization
  let user = '';
  if (select.dataUser?.profile?.name)
   user = select.dataUser.profile.name;
  
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const callbacks = {
    //выход пользовтаеля
    logOut: useCallback(() => {setCookie("token", "");
      store.get('authorization').logOut(select.tokenUser);
      store.get('userinfo').delUserInfo();
    }, [])
  };

  return (
    <Spinner active={select.waiting}>
      <Authorization user={user} 
                   login={t('login')} 
                   logout={t('logout')}
                   loginUrl={'/login'}
                   profileUrl={'/profile'}
                   logOut={callbacks.logOut}
                   tokenUser={select.tokenUser}
      />
    </Spinner>
  );
}

export default React.memo(LoginLogout);
