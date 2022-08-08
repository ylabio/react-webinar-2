import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {getCurrencyPrice} from '../../utils';
import List from '../../components/list'
import './style.css';

function Cart(props) {
  const cn = bem('Cart');

  return (
    <>
      {!props.items.length && <p style={{textAlign: 'center', fontWeight: '700'}}>Товаров нет</p>}
      {!!props.items.length && 
        <>
          <List
            items={props.items}
            btnName={'Удалить'}
            handleAction={props.onRemoveToCart}
          />
          <div className={cn('total')}>
            <p>
              Итого <span className={cn('total-price')}>{getCurrencyPrice(props.totalPriceCart)}</span>
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
  totalPriceCart: propTypes.number,
}

Cart.defaultProps = {
  onRemoveToCart: () => {},
  totalPriceCart: 0,
}
