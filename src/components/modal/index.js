import React from "react"
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types';
import "style.css"

function Modal ({closeBtn , head , children}) {
    const cn = bem('Modal');

    return (
        <div className={cn()} onClick={() => closeBtn()}>
          <div className={cn('window')}>
            <div className={cn('head')}>
              {head}
              <button onClick={() => closeBtn()}>Закрыть</button>
            </div>
            <div className={cn('content')} onClick={(e) => e.stopPropagation()}>
              {children}
            </div>
          </div>
        </div>
    )
}

Modal.propTypes = {
    closeBtn: propTypes.func.isRequired,
    head: propTypes.node,
    children: propTypes.node,
  }

Modal.defaultProps = {

  }

export default Modal