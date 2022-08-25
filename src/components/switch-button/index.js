import React from 'react';
import {useLocation} from 'react-router-dom'
import {Link} from 'react-router-dom';
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Switch({username, authorized, route, value, onExitProfile, onExitUser, onNavigate, onProfile}) {
  const cn = bem('Switch');
  const location = useLocation();

  const onClick = () => {
    onExitProfile();
    onExitUser();
  }

  return (
    <div className={cn()}>
      <div>
        <Link to='/profile' className={cn('user-link')} onClick={onProfile} >{username}</Link>
      </div>
      <div onClick={authorized && location.pathname === '/profile' ? () => onNavigate(-1) : null}>
        <button
          className={cn('btn')}
          type='button'
          onClick={authorized ? onClick : () => onNavigate(route)}
        >
          {value}
        </button>
      </div>
    </div>
  )
}

Switch.propTypes = {
  username: propTypes.string,
  authorized: propTypes.bool.isRequired,
  route: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  onExitProfile: propTypes.func.isRequired,
  onExitUser: propTypes.func.isRequired,
  onNavigate: propTypes.func.isRequired,
  onProfile: propTypes.func.isRequired
}

Switch.defaultProps = {
  username: ''
}

export default React.memo(Switch);
