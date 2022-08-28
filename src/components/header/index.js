import React from 'react';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import {Link, useLocation, useNavigate} from "react-router-dom";
import propTypes from "prop-types";

function Header(props) {
  const cn = bem('Header');
  
  const navigate = useNavigate()
  const location = useLocation()
  
  const callbacks = {
    linkToLogin: React.useCallback(() => {
      if (props.logout) props.logout()
      navigate('/login', {state: {back: location.pathname}})
    }, [location.pathname])
  };
  
  return (
    <div className={cn()}>
      <div className={cn('container')}>
        <Link to='/profile'>
          <div className={cn('userName')}>{props.userName}</div>
        </Link>
        <button className={cn('toLoginButton')} onClick={callbacks.linkToLogin}>{props.buttonText}</button>
      </div>
    </div>
  )
}

Header.propTypes = {
  userName: propTypes.string,
  logout: propTypes.func,
  buttonText: propTypes.string
}

Header.defaultProps = {}

export default React.memo(Header);
