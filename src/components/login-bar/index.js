import React from "react";
import {Link} from "react-router-dom";
import './style.css';
import {cn as bem} from "@bem-react/classname";
import useTranslate from "../../hooks/use-translate";

function LoginBar({ userName, logOut }) {
  const cn = bem('LoginBar');
  const {t} = useTranslate();
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

export default React.memo(LoginBar);