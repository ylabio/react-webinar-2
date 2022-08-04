import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import React from 'react';
import './style.css';

function Popup({children, head}) {
  const cn = bem('Popup');
  return (
    <div className={cn()}>
      <div className={cn('dialog')}>
        <div className={cn('head')}>{head}</div>
        <div className={cn('content')}>{children}</div>
      </div>
    </div>
  );
}

Popup.propTypes = {
  children: propTypes.node,
  head: propTypes.node
};

export default React.memo(Popup);
