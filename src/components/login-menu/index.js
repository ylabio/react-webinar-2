import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {cn as bem} from '@bem-react/classname'
import { AuthContext } from '../../store/authcontext';
import './style.css';

function LoginMenu(props) {
  const cn = bem('LoginMenu');
  const { loginTitle, logOutTitle } = props.options;
  const { user, toLogin, logOut } = useContext(AuthContext);
  const localStorageUser = localStorage.user && JSON.parse(localStorage.user);

  const UserMenu = () => (
    <>
        <Link className={cn('link')} to={'/profile'}>
          {localStorageUser.profile.name || user.profile.name}
          {' '}
          {localStorageUser.profile.surname || user.profile.surname}
        </Link>
        <button type='submit' onClick={logOut}>{logOutTitle}</button>
    </>
  );

  const ToLogin = () => (<button type='submit' onClick={toLogin}>{loginTitle}</button>)

  return (
    <div className={cn()}>
        {(user || localStorageUser) && <UserMenu />}
        {(!localStorageUser && !user) && <ToLogin />}
    </div>
  )
}

export default React.memo(LoginMenu);
