import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function LoginMenu(props) {
  const cn = bem('LoginMenu');
  const navigate = useNavigate();
  const toLogin = () => navigate('/login');
  const { options: { loginTitle, logOutTitle }, logOut, user } = props;

  const ToLogin = () => (<button type='submit' onClick={toLogin}>{loginTitle}</button>);
  const UserMenu = () => (
    <>
        <Link className={cn('link')} to={'/profile'}>
          {user.profile.name}
          {' '}
          {user.profile.surname}
        </Link>
        <button type='submit' onClick={logOut}>{logOutTitle}</button>
    </>
  );

  return (
    <div className={cn()}>
        {user && <UserMenu />}
        {!user && <ToLogin />}
    </div>
  )
}

export default React.memo(LoginMenu);
