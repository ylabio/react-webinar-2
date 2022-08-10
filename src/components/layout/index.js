import React, {useCallback} from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";

function Layout(props){
  const cn = bem('Layout');
  const { isModalOpen, head, children, onClick } = props;
  
  const callbacks = {
    onClose: useCallback((e) => {
      e.stopPropagation();
      onClick();
    }, [onClick]),
  };

  return (
    <div className={cn({'overlay': isModalOpen})} onClick={callbacks.onClose}>
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
  isModalOpen: propTypes.bool,
  onClick: propTypes.func,
  head: propTypes.node,
  children: propTypes.node,
}

Layout.defaultProps = {
}

export default React.memo(Layout);
