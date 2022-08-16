import React from 'react';
import { cn as bem } from "@bem-react/classname";
import { Link } from 'react-router-dom';
import './style.css'

export default function Menu() {
  const cn = bem('Menu');

  return (
    <ul className={cn()}>
      <li className={cn('item')}>
        <Link className={cn('link')} to='/'>Главная</Link>
      </li>
    </ul>
  )
}
