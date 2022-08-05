import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types';
import './style.css';

function Modal({isModal, toggleModal, head}){
  const cn = bem('Modal');

  return (<div className={cn({'opened': isModal})}>
        <div className={cn('container')}>
          <div className={cn('head')}>
            {head}
            <button onClick={toggleModal}>Закрыть</button>
          </div>          
        </div>
        <div className={cn('bg')} onClick={toggleModal} />
      </div>)
}

Modal.propTypes = {
  isModal: propTypes.bool.isRequired,
  toggleModal: propTypes.func.isRequired,
  head: propTypes.node.isRequired,
}

Modal.defaultProps = {
  isModal: false,
  toggleModal: () => {},
  head: <h1>Заголовок</h1>
}

export default React.memo(Modal);
