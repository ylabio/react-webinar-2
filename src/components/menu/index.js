import React from "react";
import {Link} from "react-router-dom";
import {cn as bem} from '@bem-react/classname';
import './index.css';

function Menu (props) {
  const cn = bem('Menu');

  return (
    <div className={cn()}>
      {props.children}
    </div>
  )
}

export default React.memo(Menu);