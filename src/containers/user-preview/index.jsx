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
    logged: state.user.logged,
    username: state.user.info.name,
  }));

  const logout = useCallback(() => store.get('user').logout(), []);
  const login = useCallback(() => navigate('/login'), []);

  return (
    <div className='user-preview'>
      {select.logged
        ? <>
          <Link to='/profile'>{select.username}</Link>
          <button onClick={logout}>{t('logout')}</button>
        </>
        : <button onClick={login}>{t('login')}</button>
      }
    </div>
  )
}

export default UserPreview;