import React from "react"
import './style.css';
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types';
import {Link} from "react-router-dom"

function Menu(props) {
  const cn = bem('Menu');

  return (
  <ul className={cn()}>
    <li className={cn('item')}>
      <Link to='/'>{props.translate(props.language, props.codesMenu.CODE_7) || 'Главная'}</Link>
    </li>
  </ul>
  )
}

Menu.propTypes = {
  codesMenu: propTypes.object.isRequired,
  translate: propTypes.func.isRequired,
  language: propTypes.string.isRequired,
}

Menu.defaultProps = {
  codesMenu: {},
  translate: () => {},
};

export default React.memo(Menu)