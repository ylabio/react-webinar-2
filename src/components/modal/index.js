import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";

function Modal({children, head, setActive}){

  const cn = bem('Modal');

  return (
    <div className={cn()}>
      <div className={cn('content')}>
        <div className={cn('head')}>
            <h2 className={cn('name')}>{head}</h2>
            <button className={cn('close')} onClick={() => setActive(0)}>Закрыть</button>
        </div>
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  children: propTypes.node.isRequired,
  setActive: propTypes.func.isRequired,
  head: propTypes.string.isRequired
}

Modal.defaultProps = {
}

export default React.memo(Modal);
