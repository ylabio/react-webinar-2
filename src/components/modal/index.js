import React, { useCallback } from "react"
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";

function Modal({head, callback, children}){
  const cn = bem('Modal');

  let callbacks = {
    onClose: useCallback((e) => {
        e.stopPropagation();
        callback()
    }, [callback])
}

  return (
    <div className={cn()}>
      <div className={cn('wrapper')}>
        <div className={cn('head')}>
          <h1>{head}</h1>
          <button onClick={callbacks.onClose}>Закрыть</button>
        </div>
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  head: propTypes.node.isRequired,
  callback: propTypes.func.isRequired,
  children: propTypes.node.isRequired,
}

export default React.memo(Modal);
