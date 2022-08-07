import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import ItemCart from '../item-cart';
import './style.css';

function ListCart(props) {
  const cn = bem('ListCart');

  return (
    <div className={cn()}>{props.itemsCart.map((item, i) =>
      <div key={i} className={cn('item')}>
        <ItemCart item={item} onDelete={props.onItemCartDelete}/>
      </div>
    )}
      {props.itemsCart.length ? 
      (<div className={cn('sum')}>
        <div>Итого</div>
        <div>{`${props.sumPrices.toLocaleString()} ₽`}</div>
      </div>) : 
      (<div className={cn('sum')}>
        <div>Корзина пуста</div>
      </div>)
      }
    </div>
  )
}

ListCart.propTypes = {
  itemsCart: propTypes.arrayOf(propTypes.object).isRequired,
  sumPrices: propTypes.number.isRequired,
  onItemCartDelete: propTypes.func.isRequired
}

ListCart.defaultProps = {
  itemsCart: [],
  sumPrices: 0,
  onItemCartDelete: () => {}
}

export default React.memo(ListCart);
