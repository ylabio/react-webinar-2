import React from "react";
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css'

function ModalHeader({setModalActive}){
  const cn = bem('ModalHeader');

  return(
    <div className={cn()}>
      <h1>Корзина</h1>
      <button onClick={()=>setModalActive(false)}>Закрыть</button>
    </div>
        
    )
}

ModalHeader.propTypes = {
  setModalActive: propTypes.func
}

ModalHeader.defaultProps = {
  setModalActive: () => {}
}

export default React.memo(ModalHeader);