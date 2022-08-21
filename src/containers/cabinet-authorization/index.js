import React, {useCallback} from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";
import Tools from "../tools";
import UserLogin from "../../components/user-login";

function CabinetAuthorization() {

  const store = useStore();

  const select = useSelector(state => ({
    items: state.catalog.items,
    page: state.catalog.params.page,
    limit: state.catalog.params.limit,
    count: state.catalog.count,
    waiting: state.catalog.waiting,
    dataUser: state.authorization.dataUser,
    loginError: state.authorization.error
  }));

  //обработка ошибки авторизации
  let error = '';
  if (select.loginError?.data?.issues[0]?.message)
    error = select.loginError?.data?.issues[0]?.message;
  let user ='';
  if (select.dataUser?.profile?.name)
    user = select.dataUser.profile.name; 

  const callbacks = {
    onLogin: useCallback((e, login, password) => {store.get('authorization').login(login, password);
    e.preventDefault();
    e.target.reset();
    }, []),
  };

  const {t} = useTranslate();

  return (
    <Spinner active={select.waiting}>
      <Tools/>
      <UserLogin  in={t('login.in')} 
                  login={t('login.login')} 
                  pass={t('login.pass')}
                  error={error}
                  user={user}
                  inButton={t('login.inButton')}
                  onLogin={callbacks.onLogin}
                  profileUrl={'/'}/>
    </Spinner>
  );
}

export default React.memo(CabinetAuthorization);
