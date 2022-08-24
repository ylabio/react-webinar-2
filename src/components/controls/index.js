import {cn as bem} from "@bem-react/classname";
import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import {Link} from "react-router-dom";

function Controls({isLogin, onLogout, onLogin, userName, link}){

  const cn = bem('Controls');

  if(!isLogin) {
    return  (
      <div className={cn()}>
        <button onClick={onLogin}>Войти</button>
      </div>
    )
  }

  return (
    <div className={cn()}>
      {link ? <Link className={cn('link')} to={link}>{userName}</Link> : null}
      <button className={cn('button')} onClick={onLogout}>Выйти</button>
    </div>
  )
}

Controls.propTypes = {
  onLogin: propTypes.func.isRequired,
  onLogout: propTypes.func.isRequired,
  onProfile: propTypes.func.isRequired,
  isLogin: propTypes.bool,
  userName: propTypes.string,
  link: propTypes.string,
}

Controls.defaultProps = {

}

export default React.memo(Controls);
