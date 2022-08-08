import React, {useState} from 'react';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import propTypes from 'prop-types';
import Header from '../../components/header'

function Layout({head, children}){
  const cn = bem('Layout');

  return (
    <div className={cn()}>
      <Header>
        {head}
      </Header>
      <div className={cn('content')}>
        {children}
      </div>
    </div>
  )
}

Layout.propTypes = {
  head: propTypes.node.isRequired,
  children: propTypes.node,
}

Layout.defaultProps = {
}

export default React.memo(Layout);
