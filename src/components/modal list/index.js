import React, { useCallback, useState } from "react";
import './style.css';
import {cn as bem} from "@bem-react/classname";
import ModalItem from "../modal item";
import ModalResult from "../modal result";

function ModalList(props){
  const cn = bem('ModalList');

  const {callbacks} = props
  const [order, setOrder] = useState(callbacks.getOrder());

  const onDeleteHanler = useCallback(code => {
    setOrder(order => order.filter(item => {
      return (item.code === code)? false : true;         
    }))
  }, [order])

  return(
    <div className={cn()}>
      {order.map(item =>
        <div className={cn('item')} key={item.code}>
          <ModalItem key={item.code} item={item} onDelete={onDeleteHanler}/>
        </div>)}
        <ModalResult order={order}/>
    </div>
    )
}

export default React.memo(ModalList);