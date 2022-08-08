import React, { useContext } from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css'
import { OrderContext } from "../../app";

function ModalHeader(){
  const cn = bem('ModalHeader');
  const {setModalActive} = useContext(OrderContext)

  return(
    <div className={cn()}>
      <h1>Корзина</h1>
      <button onClick={()=>setModalActive(false)}>Закрыть</button>
    </div>
        
    )
}

export default React.memo(ModalHeader);