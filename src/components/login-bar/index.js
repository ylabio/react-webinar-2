import React from "react";
import {Link} from "react-router-dom";
import './style.css';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";

function LoginBar({ userName, t, callback }) {
  const cn = bem('LoginBar');

  return (
    <div className={cn()}>
      <Link to="/profile"><p className={cn('user')}>{userName}</p></Link>
      <button className={cn('btn')} onClick={callback}>
        {userName ? t("login-bar.logout-btn") : t("login-bar.login-btn")}
      </button>

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
