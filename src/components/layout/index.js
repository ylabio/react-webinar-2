import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";

function Layout({head, children, isModal= false, setOpenModal}){
  const cn = bem('Layout');
  const cnModal = bem('Modal');

  return (
    <div className={`${!isModal ? cn() : cnModal()}`}>
      <div className={`${!isModal ? cn('head') : cnModal('head')}`}>
        {head}
        {isModal &&
          <div className={cnModal('button')}>
            <button onClick={() => setOpenModal(false)}>Закрыть</button>
          </div>
        }
      </div>
      <div className={`${!isModal ? cn('content') : cnModal('content')}`}>
        {children}
      </div>
    </div>
  )
}

Layout.propTypes = {
  head: propTypes.node,
  children: propTypes.node,
}

Layout.defaultProps = {
}

export default React.memo(Layout);
