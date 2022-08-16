import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import { Link } from 'react-router-dom';
import './style.css';


function Menu({main, link}) {
  const cn = bem('Menu');

  return (
    <div className={cn()}>
      <Link to={link}>{main}</Link>
    </div>
  )
}

Menu.propTypes = {
  main: propTypes.string,
  link: propTypes.string
}

Menu.defaultProps = {
  main: 'Главная',
  link: '/'
}

export default React.memo(Menu);
