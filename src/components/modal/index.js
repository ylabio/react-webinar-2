import React, {useCallback} from "react";
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import './style.css';

function Modal(props){
    const cn = bem('Modal');
    const { cart, totalAmount, totals, onClose, onRemove } = props;

    const callbacks = {
        onClose: useCallback(() => {
            onClose();
          }, [onClose, cart]),
        onRemove: useCallback((code) => {
            onRemove(code);
        }, [onRemove, cart]),
      };
    
    const CartList = useCallback(() => {
        if (cart.some(item => item.selectedTimes > 0)) {
            return (
                <div className={cn('list')}>
{cart.map(({ code, title, price, selectedTimes}) =>
                <div key={code}>
                    <div className={cn('item')}>
                        <div className={cn('number')}>
                            {code}
                        </div>
                        <div className={cn('title')}>
                            {title}
                        </div>
                        <div className={cn('price')}>
                            {price} ₽
                        </div>
                        <div className={cn('price')}>
                            {selectedTimes} шт
                        </div>
                        <div className={cn('actions')}>
                            <button className={cn('list_actions-button')} onClick={() => callbacks.onRemove(code)}>
                                Удалить
                            </button>
                        </div>
                    </div>
                </div>)}
                </div>
                
            )
        } return null;
    }, [cart, totals])

    return (
        <div className={cn()}>
            <div className={cn('header')}>
                <h2>Корзина</h2>
                <button className={cn('button_close')} onClick={callbacks.onClose}>
                    Закрыть
                </button>
            </div>
            <CartList />
            <div className={cn('total')}>
                Итого 
                <span className={cn('amount')}>{totalAmount} ₽</span>
            </div>
        </div>
    )
}

Modal.propTypes = {
  cart: propTypes.arrayOf(propTypes.object).isRequired,
  totalAmount: propTypes.number,
  onClose: propTypes.func.isRequired,
  onRemove: propTypes.func.isRequired,
}

Modal.defaultProps = {
  cart: [],
  totalAmount: 0,
  onClose: () => {},
  onRemove: () => {},
}

export default React.memo(Modal);
