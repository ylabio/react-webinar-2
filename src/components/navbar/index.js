import React from 'react';
import {cn as bem} from '@bem-react/classname';
import {Link} from 'react-router-dom';
import 'style.css';

function Navbar() {
  const cn = bem('Navbar');

  return (
    <nav className={cn()}>
      <ul>
        <li>
          <Link to="/">Главная</Link>
        </li>
      </ul>
    </nav>
  );
}

export default React.memo(Navbar);
