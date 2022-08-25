import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types';
import './style.css';

function LayoutLogin({children}){
  const cn = bem('LayoutLogin');

  return (
    <div className={cn()}>
      <div className={cn('login')}>
        {children}
      </div>
    </div>
  )
}

LayoutLogin.propTypes = {
  children: propTypes.node,
}

export default React.memo(LayoutLogin);
