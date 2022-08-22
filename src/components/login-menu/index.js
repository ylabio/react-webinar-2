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
        <Link to={`/users/${localStorageUser._id}`}>{localStorageUser.username}</Link>
        <button type='submit' onClick={logOut}>{logOutTitle}</button>
    </>
  );

  const ToLogin = () => (<button type='submit' onClick={toLogin}>{loginTitle}</button>)

  return (
    <div className={cn()}>
        {(user || localStorageUser) && <UserMenu />}
        {!(user || localStorageUser) && <ToLogin />}
    </div>
  )
}

export default React.memo(LoginMenu);
