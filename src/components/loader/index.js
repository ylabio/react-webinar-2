import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';



function Loader() {
  const cn = bem('Loader');
  return (
    <div className={cn('')}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
)
  
}


export default React.memo(Loader);
