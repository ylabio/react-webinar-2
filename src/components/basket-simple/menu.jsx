import React from 'react'
import { Link } from 'react-router-dom';
import { cn as bem } from "@bem-react/classname";
import './styles.css';
import { mainPage } from '../../path/path';

export const Menu = () => {
  const cn = bem('BasketSimple');
  return (
    
      <Link style={{marginLeft:'20px'}}  className={cn('link')} to={mainPage}>Главная</Link>
    
  )
}
