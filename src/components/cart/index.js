import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import CartItem from '../../components/cart-item';
import './style.css';

function Cart(props) {
  const cn = bem('Cart');

  return (
    <>
      {!props.items.length 
        ? <p style={{textAlign: 'center', fontWeight: '700'}}>Товаров нет</p>
        : <>
            <div className={cn()}>{props.items.map(item =>
              <div key={item.code} className={cn('item')}>
                <CartItem item={item} handleAction={props.onRemoveToCart} btnName={'Удалить'}/>
              </div>)}
            </div>
            <div className={cn('total')}>
              <p>
                Итого <span className={cn('total-price')}>{props.totalCurrencyPrice}</span>
              </p>
            </div>
          </>
      }            
    </>
  )
}

export default React.memo(Cart);

Cart.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onRemoveToCart: propTypes.func,
  totalCurrencyPrice: propTypes.string,
}

Cart.defaultProps = {
  onRemoveToCart: () => {},
  totalCurrencyPrice: '',
}
