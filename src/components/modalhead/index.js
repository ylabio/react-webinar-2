import React, { useCallback } from "react";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function MoadalCartHeader(props){
    const cn = bem('Modal-cart-header')
    const { onClose } = props;
    const callbacks = {
        onClose: useCallback(() => {
            onClose();
        }, [onClose])
    };

    return(
        <>
            <h2>Корзина</h2>
            <button className={cn('button_close')} onClick={callbacks.onClose}>
                Закрыть
            </button>
        </>
    )
}
export default React.memo(MoadalCartHeader)