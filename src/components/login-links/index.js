import React from 'react';
import {Link} from "react-router-dom";
import {cn as bem} from '@bem-react/classname'
import propTypes, { string } from "prop-types";
import './style.css';

function LoginLinks({user, link, status}){
  const cn = bem('LoginLinks');

  return (
    <div className={cn()}>
    {status ===  'auth' ?
      <>
        <Link to={'/profile'} className={cn('user')}>{user.profile.name}</Link>
        <button className={cn('button')}>Выход</button>
      </> :
      <Link to={link} className={cn('button')}>Вход</Link> 
    }
    </div>
  )
}

LoginLinks.propTypes = {
  status: string,
  user: propTypes.object,
  link: propTypes.string,
}

LoginLinks.defaultProps = {
  user: {},
  link: '/login',
}

export default React.memo(LoginLinks);
