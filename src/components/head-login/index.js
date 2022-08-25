import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './styles.css';
import { NavLink } from 'react-router-dom';


function HeadLogin({name, logout, token, t}) {
  const cn = bem('HeadLogin');
  return (
    <div className={cn()}>
      <NavLink to={'/profile'} className={cn('name')}>{name}</NavLink>
      <button className={cn('button')} onClick={() => logout(token)}>{t('auth.exit')}</button>
    </div>
  )
}

HeadLogin.propTypes = {
  t: propTypes.func
}

HeadLogin.defaultProps = {
  t: (text) => text
}

export default React.memo(HeadLogin);
