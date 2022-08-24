import React from 'react';
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname'
import {Link} from "react-router-dom";
import './style.css';

function Menu(props) {
  const cn = bem('Menu');

  return (
    <ul className={cn()}>
      {props.items.map(item => (
        <li key={item.key} className={cn('item')}>
          <Link to={item.link}>{item.title}</Link>
        </li>
      ))}
    </ul>
  )
}

Menu.propTypes = {
  items: propTypes.arrayOf(propTypes.object),
}

Menu.defaultProps = {
  items: []
}

export default React.memo(Menu);
