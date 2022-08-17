import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import "./style.css"

function Menu(props) {
  const cn = bem('Menu');
  return (
    <div className={cn()}>
      <Link to='/' className={cn('main')}>{props.main}</Link>
      {props.children}
    </div>
  )
}

Menu.propTypes = {
  main: propTypes.string
}

Menu.defaultProps = {
  main: 'Main'
}

export default React.memo(Menu);
