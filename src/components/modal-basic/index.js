import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";


import './styles.css';

function ModalBasic({isActive, closeModal, children,}) {
  const cn = bem('ModalBasic');

  const onStopPropagation = (e) => {
    e.stopPropagation();
  };

  if (!isActive) {
    return null;
  }

  return (
    <div className={cn('modal')} onClick={closeModal}>
      <div className={cn('content')} onClick={onStopPropagation}>
        <button className={cn('buttonClose')} onClick={closeModal}>
          Закрыть
        </button>
        {children}
      </div>
    </div>
  );
}

ModalBasic.propTypes = {
  isActive: propTypes.bool.isRequired,
  closeModal: propTypes.func.isRequired,
  children: propTypes.node,
}

export default React.memo(ModalBasic);
