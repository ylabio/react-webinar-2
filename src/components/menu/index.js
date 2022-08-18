import React from 'react';
import {cn as bem} from "@bem-react/classname";
import { Link } from 'react-router-dom';
import './style.css'
import propTypes from 'prop-types';
function Menu(props) {
  const cn = bem('menu');

  return (
    <div
      className={cn()}
        onClick={props.toNull}
    >
      <Link 
        to="/"
      >Главная</Link>
    </div>
  )
}

Menu.propTypes = {
    toNull: propTypes.func.isRequired,
}

Menu.defaultProps = {
    toNull: () => {}
}

export default React.memo(Menu);
