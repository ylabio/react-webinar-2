import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import { Link } from 'react-router-dom';


function Menu(props) {
  const cn = bem('Menu');

  return (
    <div className={cn()}>
        <Link to='/' className={cn('main')} >
        {props.translate("main")}
        </Link>
    </div>
  )
}

Menu.propTypes = {
  translate: propTypes.func,
}

Menu.defaultProps = {
  translate: () => {},
}

export default React.memo(Menu);
