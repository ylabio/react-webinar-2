import React from 'react';
import {cn as bem} from "@bem-react/classname";
import 'style.css';

function Preloader() {
  const cn = bem('Preloader');

  return (
    <div className={cn()}>
      <div className={cn('lds-ripple')}>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default React.memo(Preloader);
