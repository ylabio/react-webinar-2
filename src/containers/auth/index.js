import React, {useCallback, useEffect} from 'react';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import useSelector from "../../hooks/use-selector";
import {Link, useNavigate} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from '../../hooks/use-init'

function Auth(){
  const nav = useNavigate();
  const store = useStore();
  const select = useSelector(state => ({
    auth: state.auth.auth,
    token: state.auth.token,
    data: state.auth.data
  }));

  const cn = bem('Auth');
  const callbacks = {
    logOut: useCallback(() => store.get('auth').logout(), []),
    logIn: useCallback(() => nav('/login')),
  };
  useEffect(() => {
    if (!select.auth && select.token) store.get('auth').load()
  }, [])
  const {t} = useTranslate();
  return (
    <div className={cn()}>
      {select.token  ?
        <>
          <Link to={'/profile'}><p className={cn('profile')}>{select.data.profile?.name }</p></Link>
          <button onClick={callbacks.logOut}>{t('logout')}</button>
        </>
        : <button onClick={callbacks.logIn}>{t('login')}</button>
        }
    </div>
  )
}


export default React.memo(Auth);