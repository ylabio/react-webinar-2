import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './styles.css';
import { NavLink } from 'react-router-dom';


function HeadLogout({t}) {
  const cn = bem('HeadLogout');
  return (
    <button className={cn('button')}>
      <NavLink to='/login'>{t('auth.enter')}  </NavLink>
    </button>
  )
}

HeadLogout.propTypes = {
  t: propTypes.func
}

HeadLogout.defaultProps = {
  t: (text) => text
}

export default React.memo(HeadLogout);
