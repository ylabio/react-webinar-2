import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';
import { Link } from 'react-router-dom';

function Header({ action, userName, link }){
  const cn = bem('Header');

  return (
    <header className={cn()}>
      <Link to={link} className={cn('user')}>
        {userName}
      </Link>
      <div className={cn('btn')}>
        <button onClick={action}>{userName ? 'Выход' : 'Вход'}</button>
      </div>
    </header>
  )
}

Header.propTypes = {
    action: propTypes.func.isRequired,
    userName: propTypes.string,
    link: propTypes.string,
}

Header.defaultProps = {
    userName: '',
    link: '',
}

export default React.memo(Header);