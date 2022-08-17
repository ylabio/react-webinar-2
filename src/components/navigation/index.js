import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {NavLink} from "react-router-dom";
import './style.css';

function Navigation(props) {
  const cn = bem('Navigation');

  return (
    <ul className={cn()}>
      {props.items.map(el =>
        <li className={cn('item')} key={el._id}>
          <NavLink className={cn('link')} to={el.path}>{el.title}</NavLink>
        </li>)}
    </ul>
  );
}

Navigation.propTypes = {
  items: propTypes.arrayOf(propTypes.exact({_id: propTypes.number, path: propTypes.string, title: propTypes.string})),
};


export default React.memo(Navigation);
