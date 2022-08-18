import React from "react";
import {Link} from "react-router-dom";
import {cn as bem} from '@bem-react/classname';
import './index.css';

function Menu () {
  const cn = bem('Menu');

  return (
    <div className={cn()}>
    <Link to='/'>Главная</Link>
    </div>
  )
}

export default React.memo(Menu);