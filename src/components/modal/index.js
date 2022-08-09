import React, {useCallback} from "react";
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import Item from "../item";
import './style.css';

function Modal(props){
    const cn = bem('Modal');
    const { cart, totalAmount, onClose, onRemove } = props;
    const callbacks = {
        onClose: useCallback((e) => {
            e.stopPropagation();
            onClose();
          }, [onClose, cart]),
        onRemove: useCallback((code) => {
            onRemove(code);
        }, [onRemove, cart]),
      };

    return (
        <div className={cn()}>
            <div>
                <div className={cn('header')}>
                    <h2>Корзина</h2>
                    <button className={cn('button_close')} onClick={callbacks.onClose}>
                        Закрыть
                    </button>
                </div>
                {cart.length !== 0 && cart.map(({ code, title, price, selectedTimes}) =>
                    <div key={code} className={cn('list')}>
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
                    <div className={cn('total')}>
                        Итого {totalAmount} ₽
                    </div>
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
  onClose: () => {},
  onRemove: () => {},
}

export default React.memo(Modal);
