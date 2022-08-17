import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Menu(props){
  const cn = bem('Menu');

  return (
    <div className={cn()}>
      {props.linksRender()}
    </div>
  )
}

Menu.propTypes = {
  linksRender: propTypes.func.isRequired
}

export default React.memo(Menu);