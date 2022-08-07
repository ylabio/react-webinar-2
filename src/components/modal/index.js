import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Modal(props) {
  const cn = bem('Modal');

  return(
    <div className={cn()}>
      <div className={cn('background')} onClick={props.handleShowModal}/>
      <div className={cn('wrap')}>
        <div className={cn('head')}>
          <p className={cn('title')}>{props.title}</p>
          <button onClick={props.handleShowModal}>Закрыть</button>
        </div>
        <div className={cn('content')}>
          {props.children}
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  title: propTypes.string,
  children: propTypes.node,
  handleShowModal: propTypes.func.isRequired,
}

Modal.defaultProps = {
  title: '',
  handleShowModal: () => {},
}

export default React.memo(Modal);