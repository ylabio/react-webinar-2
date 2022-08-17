import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Controls(props){
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      {props.children}
    </div>
  )
}

Controls.propTypes = {
  children: propTypes.node.isRequired
}

export default React.memo(Controls);
