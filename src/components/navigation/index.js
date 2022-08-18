import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import { Link } from "react-router-dom";

function Navigation() {
  const cn = bem('Navigation');

  return (
    <ul className={cn()}>
      <li className={cn('item')}><Link to='/' className={cn('link')}>Главная</Link></li>
    </ul>
  )
}

Navigation.propTypes = {

}

Navigation.defaultProps = {

}

export default React.memo(Navigation);
