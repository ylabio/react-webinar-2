import React from 'react'
import {Link, useNavigate, useLocation} from "react-router-dom";
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname'
import './style.css'

function AuthStatus(props) {
  const cn = bem("AuthStatus")
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className={cn()}>
      {props.isAuth ? 
        <>
          <Link to={'/profile'} className={cn('link')}>{props.username}</Link>
          <button onClick={props.logout}>Выход</button>
        </>
      : 
        <button onClick={() => navigate('/login', {state: {from: location.pathname}} )}>Вход</button>
      }
    </div>
  )
}

export default React.memo(AuthStatus)

AuthStatus.propTypes = {
  isAuth: propTypes.bool,
  username: propTypes.string,
  logout: propTypes.func,
  t: propTypes.func
}

AuthStatus.defaultProps = {
}