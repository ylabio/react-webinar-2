import React from 'react';
import { cn as bem } from '@bem-react/classname';
import { Outlet } from 'react-router-dom';
import propTypes from 'prop-types';
import './style.css';

function Layout({ head, children }) {
  const cn = bem('Layout');

  return (
    <div className={cn()}>
      <div className={cn('head')}>{head}</div>
      <div className={cn('content')}>
        <Outlet />
      </div>
    </div>
  );
}

Layout.propTypes = {
  head: propTypes.node,
  children: propTypes.node,
};

Layout.defaultProps = {};

export default React.memo(Layout);
