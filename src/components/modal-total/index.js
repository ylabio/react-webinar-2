import React from "react";
import { cn as bem } from '@bem-react/classname';
import { divideNumberByPieces } from "../../utils";
import './style.css';

function ModalTotal(props){
    const { totalAmount } = props;
    const cn = bem('Modal-total')
    return(
        <div className={cn()}>
        Итого 
        <span className={cn('amount')}>{divideNumberByPieces(totalAmount)} ₽</span>
    </div>
    )
}

export default React.memo(ModalTotal);