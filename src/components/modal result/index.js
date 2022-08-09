import React from "react";
import './style.css'
import {cn as bem} from "@bem-react/classname";

function ModalResult({order}){
  const cn = bem('ModalResult');

  let sum = order.reduce((sum, item) => sum + item.price * item.amount, 0);

  return (
    <div className={cn()}>        
      <div className={cn('total')}>Итого</div> 
        <div className={cn('result')}>{`${Intl.NumberFormat('ru-RU').format(sum)} ₽`}</div>      
    </div>
  )
}

export default React.memo(ModalResult);