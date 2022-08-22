import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';
import LayoutFlex from '../layout-flex';
import {Link} from "react-router-dom";

function Layout({head, children}){
  const cn = bem('Layout');

  return (
    <div className={cn()}>
      <LayoutFlex flex="end" padding="10-20">
          <div className={cn('username')}>User 1</div>
          <Link to={'/auth'}>
            <button>Вход</button>
          </Link>
          
      </LayoutFlex>
      <div className={cn('head')}>
        {head}
      </div>
      <div className={cn('content')}>
        {children}
      </div>
    </div>
  )
}

Layout.propTypes = {
  head: propTypes.node,
  children: propTypes.node,
}

Layout.defaultProps = {
}

export default React.memo(Layout);
