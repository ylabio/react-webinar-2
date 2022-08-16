import React from 'react'
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types';
import {Link} from "react-router-dom";
import './style.css'

function Menu(props) {
  const cn = bem('Menu')

  const links = [
    {
      to: '/',
      text: 'Главная'
    },
  ]

  return (
    <div className={cn()}>
      <ul className={cn('list')}>
        {links.map((link) => 
          <li className={cn('item')}>
            <Link to={link.to} className={cn('link')}>{props.translate(link.text)}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Menu

Menu.propTypes = {
  translate: propTypes.func
}

Menu.defaultProps = {
  translate: () => {}
}