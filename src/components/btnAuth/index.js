import React, { useCallback } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import LayoutFlex from "../layout-flex";
import propTypes from "prop-types";
import './style.css';

function BtnAuth({ t, name, removeToken }){
  const cn = bem('BtnAuth');
  const navigate = useNavigate();

  const callbacks = {
    handleButtonClick: useCallback(() => navigate(`/login`), []),
    handleButtonExitClick: useCallback(() => removeToken(), [])
  };

  return (
    <div className={cn()}>
      <LayoutFlex flex="end">
        {name && <Link className={cn('link')} to='/profile'>{name}</Link>}
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
    </div>
  )
}

BtnAuth.propTypes = {
  name: propTypes.string,
  t: propTypes.func,
  removeToken: propTypes.func
}

BtnAuth.defaultProps = {
}

export default React.memo(BtnAuth);
