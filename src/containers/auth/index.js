import React, {useCallback, useEffect} from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import {useNavigate} from 'react-router-dom';
import ProfileControls from '../../components/profile-controls';

const Auth = () => {
  const store = useStore();

  const navigate = useNavigate()

  useEffect(() => {
    if(select.token && !select.userName) {
      store.get('auth').getToken()
    }
  }, [])

  const select = useSelector(state => ({
    token: state.auth.token,
    userName: state.auth.user.profile?.name,
  }));

  const callbacks = {
    onLogin: useCallback(() => navigate('/login'), []),
    onExit: useCallback(() => store.get('auth').logOut(), []),
  }
  const {t} = useTranslate();
  return (
    <div>
    {select.token ?
      <ProfileControls link={'/profile'}
                       userName={select.userName}
                       onClickCallback={callbacks.onExit} 
                       buttonName={t("auth.logout")}
                       />

                  :
                  
      <button onClick={callbacks.onLogin}>{t("auth.login")}</button>}
    </div>
  );
};

export default React.memo(Auth);