import React from "react"
import './styles.css';
import {cn as bem} from "@bem-react/classname";
import {Link} from "react-router-dom"

function Menu() {
  const cn = bem('Menu');

  return (
  <ul className={cn()}>
    <li className={cn('item')}>
      <Link to='/'>Главная</Link>
    </li>
  </ul>
  )
}

export default React.memo(Menu)