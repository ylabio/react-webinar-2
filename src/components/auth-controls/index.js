import React from 'react'
import {Link, useNavigate} from "react-router-dom";
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname'
import './style.css'

function AuthControls(props) {
  const cn = bem("AuthControls")
  const navigate = useNavigate()

  return (
    <div className={cn()}>
      {props.isAuthenticated ? 
        <>
          <Link to={'/profile'} className={cn('link')}>{props.username}</Link>
          <button onClick={props.logout}>{props.t('auth.signout')}</button>
        </>
      : 
        <button onClick={() => navigate('/login')}>{props.t('auth.signin')}</button>
      }
    </div>
  )
}

export default AuthControls

AuthControls.propTypes = {
  isAuthenticated: propTypes.bool,
  username: propTypes.string,
  logout: propTypes.func,
  t: propTypes.func
}

AuthControls.defaultProps = {
}