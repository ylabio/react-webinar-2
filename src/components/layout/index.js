import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Layout({ headerTitle, children }) {
  const cn = bem('Layout');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        <h1>{headerTitle}</h1>
      </div>
      <div className={cn('content')}>
        {children}
      </div>
    </div>
  );
}

Layout.propTypes = {
  headerTitle: propTypes.node,
  children: propTypes.node,
};

Layout.defaultProps = {
  headerTitle: 'Header title'
};

export default Layout;
