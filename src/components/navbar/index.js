import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function Navbar() {
  return (
    <div>
      <Link className='NavBar-link' to={'/'}>
        Главная
      </Link>
    </div>
  );
}

export default React.memo(Navbar);
