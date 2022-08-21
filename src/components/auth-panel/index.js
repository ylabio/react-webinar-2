import React from "react";
import {Link} from "react-router-dom";
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types';

import "./style.css"

function AuthPanel({onLogout, user, t}) {
  const cn = bem('AuthPanel');
  return(
    <div className={cn('box')}>
      <Link className={cn('link')} to="/profile">{user}</Link>
      <button className={cn('btn')} onClick={onLogout}>{t('auth.logout')}</button>
    </div>
  )
}

AuthPanel.propTypes = {
  onLogout: propTypes.func,
  user: propTypes.string
}

AuthPanel.defaultProps = {
  user: "Заглушка"
}

export default React.memo(AuthPanel)