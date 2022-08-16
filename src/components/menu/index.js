import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {Link} from "react-router-dom";

function Menu() {
  const cn = bem('Menu')
  return (
    <div className={cn()}>
      <Link to='/'>Главная</Link>
    </div>
  );
}

export default React.memo(Menu);