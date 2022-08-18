import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Loader() {
  const cn = bem('Loader')

  return (
    <div className={cn()}>
      <p className={cn('content')}>Loading...</p>
    </div>
  )
}

export default Loader;