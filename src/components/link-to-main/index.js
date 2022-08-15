import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const LinkToMain = () => {
  const cn = bem('LinkToMain');
  return (
    <NavLink className={cn()} to="/">
      Главная
    </NavLink>
  );
};

export default React.memo(LinkToMain);
