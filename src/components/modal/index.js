import { cn as bem } from "@bem-react/classname";
import propTypes from "prop-types";
import React from 'react';
import './style.css';

function Modal(props) {
  const cn = bem('Modal');

  return (
    <div className={cn()} onClick={()=>props.setActive(false)}>
      <div className={cn('content')} onClick={e => e.stopPropagation()}>
        <button className={cn('close')} onClick={()=>props.setActive(false)}>Закрыть</button>
        {props.children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  setActive: propTypes.func.isRequired,
  children: propTypes.node,
}

Modal.defaultProps = {
}

export default React.memo(Modal);