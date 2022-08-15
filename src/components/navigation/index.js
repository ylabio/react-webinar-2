import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {Link} from 'react-router-dom';
import {appRoute} from '../../const';
import './style.css';


function Navigation({text, address}) {
  const cn = bem('Navigation');

  return (
    <div className={cn()}>
      <Link to={address} className={cn('main')}>
        {text.main}
      </Link>
    </div>
  )
}

Navigation.propTypes = {
  text: propTypes.object,
  address: propTypes.string
}

Navigation.defaultProps = {
  text: {},
  address: appRoute.Main,
}

export default React.memo(Navigation);
