import React, {useCallback} from 'react';
import {Link} from 'react-router-dom';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";

function LoginControls({t, userName, onLogin, onLogout, link}) {

  // CSS классы по БЭМ
  const cn = bem('LoginControls');

  const callbacks = {
    // Переход на страницу авторизации
    onLogin: useCallback(() => onLogin(), [onLogin]),
    // Деавторизация пользователя
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

LoginControls.propTypes = {
  t: propTypes.func,
  userName: propTypes.string,
  onLogin: propTypes.func,
  onLogout: propTypes.func,
  link:  propTypes.string
}

LoginControls.defaultProps = {
  t: (text) => text,
  userName: '',
  onLogin: () => {},
  onLogout: () => {},
  link: ''
}

export default React.memo(LoginControls);