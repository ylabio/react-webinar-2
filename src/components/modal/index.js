import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import './style.css';
import Button from '../button';


function Modal({ children, switchModal, title }) {
  const cn = bem('Modal');
  return (
    <div className={cn()}>
      <div className={cn('background')}>
        <div className={cn('wrapper')}>
          <div className={cn('header')}>
            <div className={cn('title')}>
              {title}
            </div>
            <Button title="Закрыть" callBack={switchModal} />
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  title: propTypes.string.isRequired,
  switchModal: propTypes.func.isRequired,
  children: propTypes.node.isRequired,
}


export default React.memo(Modal);
