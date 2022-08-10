import React, {useCallback} from "react";
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import { divideNumberByPieces } from "../../utils";
import './style.css';

function Cart(props){
    const cn = bem('Cart');
    const { cart, onRemove } = props;

    const callbacks = {
        onRemove: useCallback((code) => {
            onRemove(code);
        }, [onRemove, cart]),
      };
console.log(cart)
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
                        {divideNumberByPieces(price)} ₽
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
}

Cart.propTypes = {
    cart: propTypes.arrayOf(propTypes.object),
    onRemove: propTypes.func.isRequired,
  }

Cart.defaultProps = {
    cart: [],
}

export default React.memo(Cart);