import React from 'react';
import './style.css';
import propTypes from "prop-types";

import {cn as bem} from "@bem-react/classname";

function ModalLayout({title, onVisibility, children}){
  const cn = bem('ModalLayout')

  return (
    <div className={cn('area')}>
      <div className={cn('window')}>
        <div className={cn('head')}>
          <div className={cn('header')}>
            <h1>{title}</h1>
            <button className={cn('button')} onClick={() => onVisibility()}>Закрыть</button>
          </div>
        </div>

        <div className={cn('content')}>{children}</div>
      </div>
    </div>
  )
}

ModalLayout.propTypes = {
  title: propTypes.string.isRequired,
  onVisibility: propTypes.func.isRequired,
  children: propTypes.node.isRequired
}

export default React.memo(ModalLayout);