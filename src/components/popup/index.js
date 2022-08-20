import React, {useCallback} from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";

function Popup({children, title, closePopup}){
  const cn = bem('Popup');

  const cb = {
    closePopup: useCallback((e) => {
      e.stopPropagation();
      closePopup(false);
    }, []),
  };

  return (
    <div className={cn()} >
      <div className={cn('content')}>
        <div className={cn('header')}>
          {title}
          <button onClick={cb.closePopup}>Закрыть</button>
        </div>
        {children}
      </div>
    </div>
  )
}

Popup.propTypes = {
  children: propTypes.node,
  title: propTypes.node,
  closePopup: propTypes.func.isRequired
}

Popup.defaultProps = {
  closePopup: () => {},
}

export default React.memo(Popup);