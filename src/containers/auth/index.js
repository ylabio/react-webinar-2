import React, {useCallback, useEffect} from 'react';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import useSelector from "../../hooks/use-selector";
import {Link, useNavigate} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useAuth from '../../hooks/use-auth'

function Auth(){
  const nav = useNavigate();
  const store = useStore();
  const select = useSelector(state => ({
    auth: state.user.auth,
    token: state.user.token,
    data: state.user.data
  }));

  const cn = bem('Auth');
  const callbacks = {
    logOut: useCallback(() => store.get('user').logout(), []),
    logIn: useCallback(() => nav('/login')),
  };
  useEffect(() => {
    if (!select.data.profile && select.token) store.get('user').load()
  }, [])
  const {t} = useTranslate();
  return (
    <div className={cn()}>
      {select.token  ?
        <>
          <Link to={'/profile'}><p className={cn('profile')}>{select.data.profile?.name || t('profile')}</p></Link>
          <button onClick={callbacks.logOut}>{t('logout')}</button>
        </>
        : <button onClick={callbacks.logIn}>{t('login')}</button>
        }
    </div>
  )
}


export default React.memo(Auth);