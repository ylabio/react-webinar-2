import React from 'react'
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css'

import { Button } from '../ui/button';

function Modal(props) {
  const cn = bem('Modal');

  return (
    <div className={cn('wrapper', {'hide': !props.isOpen})}>
      <div className={cn()}>
        <div className={cn('header')}>
          <h2 className={cn('title')}>{props.title}</h2>
          <Button onClick={props.onClose}>Закрыть</Button>
        </div>
        <div className={cn('content')}>
          {props.children}
        </div>
        
      </div>
    </div>
  )
}

export default Modal

Modal.propTypes = {
  children: propTypes.node,
  title: propTypes.string.isRequired,
  isOpen: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired
}

Modal.defaultProps = {
  isOpen: false,
  onClose: () => {}
}