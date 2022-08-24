import React from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import './style.css';

function Layout({ head, children, login }) {
  const cn = bem('Layout');

  return (
    <div className={cn()}>
      {login}
      <div className={cn('head')}>{head}</div>
      <div className={cn('content')}>{children}</div>
    </div>
  );
}

Layout.propTypes = {
  login: propTypes.node,
  head: propTypes.node,
  children: propTypes.node,
};

Layout.defaultProps = {};

export default React.memo(Layout);
