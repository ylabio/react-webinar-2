import React from "react";
import {Link} from "react-router-dom";
import './style.css';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";

function LoginBar({ userName, logOut, t }) {
  const cn = bem('LoginBar');

  return (
    <div className={cn()}>
      <Link to="/profile"><p className={cn('user')}>{userName}</p></Link>
      {
        userName
          ? <button onClick={() => logOut()} className={cn('btn')}>{t('login-bar.logout-btn')}</button>
          : <Link to="/login"><button className={cn('btn')}>{t('login-bar.login-btn')}</button></Link>
      }
    </div>
  )
}
LoginBar.propTypes = {
  userName: propTypes.string,
  logOut: propTypes.func,
  t: propTypes.func
};

LoginBar.defaultProps = {};

export default React.memo(LoginBar);
