import React from "react";
import {cn as bem} from "@bem-react/classname";
import {Link} from 'react-router-dom'
import './style.css'
const NotFound = () => {
  const cn = bem('NotFound')
  
  return (
  <div className={cn()}>
    <Link to = '/' className={cn('link')}>Вернуться на главную</Link>
    <div className={cn('error')}>
      <h2>Данной страницы не существует :(</h2>
    </div>
  </div>
  )
};

export default NotFound;
