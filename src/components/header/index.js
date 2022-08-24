import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';
import { Link } from 'react-router-dom';

function Header({ action, userName, link, t }){
  const cn = bem('Header');

  return (
    <header className={cn()}>
      <Link to={link} className={cn('user')}>
        {userName}
      </Link>
      <div className={cn('btn')}>
        <button onClick={action}>{userName ? t('header.logout') : t('header.login')}</button>
      </div>
    </header>
  )
}

Header.propTypes = {
    action: propTypes.func.isRequired,
    userName: propTypes.string,
    link: propTypes.string,
    t: propTypes.func,
}

Header.defaultProps = {
    userName: '',
    link: '',
    t: () => {},
}

export default React.memo(Header);