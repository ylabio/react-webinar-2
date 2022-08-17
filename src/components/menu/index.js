import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import { Link } from 'react-router-dom';


function Menu(props) {
  const cn = bem('Menu');

  return (
    <Link to='/' className={cn()} >
      {props.translate("main")}
    </Link>
  )
}

Menu.propTypes = {
  translate: propTypes.func,
}

Menu.defaultProps = {
  translate: () => {},
}

export default React.memo(Menu);
