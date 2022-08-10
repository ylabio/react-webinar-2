import React from 'react';
import './style.css';
import { cn as bem } from "@bem-react/classname";
import propTypes from "prop-types";

function Modal({onToggleModal, head, children}) {
  const cn = bem('Modal');

  return (
        <div className={cn()}>
          <div className={cn('content')}>
            <div className={cn('head')}>
              {head}
              <button onClick={onToggleModal}>Закрыть</button>
            </div>
            {children}
          </div>
        </div>
  );
}

Modal.propTypes = {
  head: propTypes.node,
  children: propTypes.node,
  onAction: propTypes.func,
}

Modal.defaultProps = {
  onAction: () => {},
}

export default React.memo(Modal);
