import React from "react";
import { Link } from "react-router-dom";
import './style.css';
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types';

function Navigation(props) {
  const cn = bem('Navigation');

  return (
    <nav className={cn()}>
      <ul className={cn('container')}>
        <li>
          <Link className={cn('link')} to='/'>{props.t('main')}</Link>
        </li>
      </ul>
    </nav>
  )
}

Navigation.propTypes = {
  t: propTypes.func,
}


export default React.memo(Navigation);
