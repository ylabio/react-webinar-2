import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {NavLink} from "react-router-dom";
import './style.css';

function Navigation(props) {
  const cn = bem('Navigation');

  return (
    <ul className={cn()}>{props.items.map(item =>
      <li key={item._id} className={cn('item')}>
        <NavLink to={item.path}>{item.title}</NavLink>
      </li>
    )}
    </ul>
  )
}

Navigation.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
}



export default React.memo(Navigation);
