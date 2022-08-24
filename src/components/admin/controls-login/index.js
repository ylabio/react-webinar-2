import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import './style.css';
import {Link} from "react-router-dom";

function ControlsLogin({token, logOut, user, t}){

  const cb = {
    logOut: useCallback(() => logOut(token), [token]),
  };

  return (
    <div className='ControlsLogin'>
      <Link to="/profile" className='ControlsLogin-user'>
        {user.name}
      </Link>
      <button className='ControlsLogin-btn' onClick={cb.logOut}>{t('panel.exit')}</button>
    </div>
  )
}

ControlsLogin.propTypes = {
  logOut: propTypes.func.isRequired,
  token: propTypes.string,
  user: propTypes.object,
  t: propTypes.func
}

ControlsLogin.defaultProps = {
  logOut: () => {},
  token: '',
  user: {},
  t: () => {},
}

export default React.memo(ControlsLogin);