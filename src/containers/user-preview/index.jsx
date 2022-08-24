import React, { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import './style.css';

const UserPreview = () => {
  const navigate = useNavigate();
  const store = useStore();
  const {t} = useTranslate();

  const select = useSelector(state => ({
    logged: state.profile.logged,
    username: state.profile.info.name,
  }));

  const callbacks = {
    login: useCallback(() => navigate('/login'), []),
    logout: useCallback(() => store.get('profile').logout(), []),
  };

  return (
    <div className='user-preview'>
      {select.logged
        ? <>
          <Link to='/profile'>{select.username}</Link>
          <button onClick={callbacks.logout}>{t('logout')}</button>
        </>
        : <button onClick={callbacks.login}>{t('login')}</button>
      }
    </div>
  )
}

export default React.memo(UserPreview);