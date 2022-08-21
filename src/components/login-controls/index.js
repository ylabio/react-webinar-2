import React, {useCallback} from 'react';
import {Link} from 'react-router-dom';
import './style.css';
import {cn as bem} from "@bem-react/classname";

function LoginControls({t, userName, onLogin, onLogout, link}) {

  // CSS классы по БЭМ
  const cn = bem('LoginControls');

  const callbacks = {
    onLogin: useCallback(() => onLogin(), [onLogin]),
    onLogout: useCallback(() => onLogout(), [onLogout]),
  }

  return (
    <div className={cn()}>
      {userName
          ? <>
            <Link to={link}>{userName}</Link>
            <button onClick={callbacks.onLogout}>{t('login.logout')}</button>
          </>
          : <button onClick={callbacks.onLogin}>{t('login.login')}</button>
      }
    </div>
  )
}

export default React.memo(LoginControls);