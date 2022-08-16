import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { cn as bem } from "@bem-react/classname";

import "style.css"

function Navigation() {
  const cn = bem('Navigation');
  return (
    <ul className={cn('list')}>
      <li className={cn('link')}>
        <Link to={`/home`}>Главная</Link>
      </li>
    </ul>
  )
}

export default memo(Navigation) 
