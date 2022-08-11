import React from "react";
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

export default React.memo(ModalHeader);