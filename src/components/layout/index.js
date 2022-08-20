import React, { useCallback } from 'react';
import { useNavigate, Link } from "react-router-dom";
import {cn as bem} from "@bem-react/classname";
import LayoutFlex from "../layout-flex";
import {getToken} from "../../services/token";

import propTypes from "prop-types";
import './style.css';

function Layout({t, name, removeToken, head, children}){
  const cn = bem('Layout');

  const navigate = useNavigate();

  const callbacks = {
    handleButtonClick: useCallback(() => navigate(`/login`), []),
    handleButtonExitClick: useCallback(() => removeToken(), [])
  };

  return (
    <div className={cn()}>
      <LayoutFlex flex="end">
        {getToken() && <Link className={cn('link')} to='/profile'>{name}</Link>}
        <button 
          type='button' 
          onClick={name ? 
            callbacks.handleButtonExitClick : 
            callbacks.handleButtonClick
          }
        >
          {name ? t('exit') : t('entery')}
        </button>
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
  name: propTypes.string,
  t: propTypes.func,
  removeToken: propTypes.func
}

Layout.defaultProps = {
}

export default React.memo(Layout);
