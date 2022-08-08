import React from 'react';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import propTypes from 'prop-types';

function Layout({head, children, modal}) {
  const cn = bem('Layout');

  return (
    <div className={cn({modal})}>
      <div className={cn('head')}>{head}</div>
      <div className={cn('content')}>{children}</div>
    </div>
  );
}

Layout.propTypes = {
  head: propTypes.node,
  children: propTypes.node,
  modal: propTypes.bool
};

Layout.defaultProps = {};

export default React.memo(Layout);
