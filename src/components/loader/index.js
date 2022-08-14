import React from 'react';
import {cn as bem} from "@bem-react/classname";
import icon from '../../assets/loader.gif';
import './style.css';

function Loader() {
  const cn = bem('Loader')

  return (
    <div className={cn()}>
      <img src={icon} alt='loader'/>
    </div>
  )
}

export default Loader;