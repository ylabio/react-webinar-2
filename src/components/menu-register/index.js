import React from 'react';
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname'
import {Link} from "react-router-dom";
import './style.css';

function MenuRegister(props) {
  const cn = bem('MenuRegister');

  return (
    <div className={cn()}>
      <Link className={cn('btn')} to={props.link}>Вход</Link>
    </div>
  )
}

MenuRegister.propTypes = {

}

MenuRegister.defaultProps = {
 
}

export default React.memo(MenuRegister);
