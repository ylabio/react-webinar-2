import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Loading() {
  const cn = bem('Loading');

  return (
    <div className={cn()}>
      <div className={cn('wrapper')}>
        <div className={cn('dot')}/>
        <div className={cn('dot')}/>
        <div className={cn('dot')}/>
        <div className={cn('dot')}/>
      </div>
    </div>
  );
}

export default React.memo(Loading);
