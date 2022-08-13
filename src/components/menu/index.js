import React from "react"
import './styles.css';
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types';
import {Link} from "react-router-dom"
import changeLanguage from "../../utils/changeLanguage";

function Menu(props) {
  const cn = bem('Menu');

  return (
  <ul className={cn()}>
    <li className={cn('item')}>
      <Link to='/'>{changeLanguage(props.language, 'MAIN_PAGE')}</Link>
    </li>
  </ul>
  )
}

Menu.propTypes = {
  language: propTypes.string.isRequired
}

export default React.memo(Menu)