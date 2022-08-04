import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import React from 'react';
import './style.css';

function Layout({head, children}) {
  const cn = bem('Layout');

  return (
    <div className={cn()}>
      <div className={cn('dialog')}>
        <div className={cn('head')}>{head}</div>
        <div className={cn('content')}>{children}</div>
      </div>
    </div>
  );
}

Layout.propTypes = {
  head: propTypes.node,
  children: propTypes.node,
  popup: propTypes.node
};

export default React.memo(Layout);
