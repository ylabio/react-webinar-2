import React from "react";
import { Link } from "react-router-dom";
import './style.css';
import {cn as bem} from "@bem-react/classname";

function Navigation() {
  const cn = bem('Navigation');

  return (
    <nav className={cn()}>
      <ul className={cn('container')}>
        <li>
          <Link className={cn('link')} to='/'>Главная</Link>
        </li>
      </ul>
    </nav>
  )
}

export default React.memo(Navigation);
