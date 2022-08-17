import React from 'react';
import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const NavBar = () => {
  const cn = bem('NavBar');

  return (
    <div className={cn()}>
      <Link to={'/'}>Главная</Link>
    </div>
  );
};

export default NavBar;
