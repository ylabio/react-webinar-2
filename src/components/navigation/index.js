import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import './style.css';


function Navigation({lang, address}) {
  const cn = bem('Navigation');

  return (
    <div className={cn()}>
      <Link to={address} className={cn('main')}>
        {lang === 'rus' ? 'Главная' : 'Main'}
      </Link>
    </div>
  )
}

Navigation.propTypes = {
  lang: propTypes.string,
  address: propTypes.string
}

Navigation.defaultProps = {
  lang: 'rus',
  address: AppRoute.Main,
}

export default React.memo(Navigation);
