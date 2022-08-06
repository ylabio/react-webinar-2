import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List(props) {
  const cn = bem('List');

  //! Если значение items пустой
  const emptyItems = props.items?.length <= 0;

  return (
    <div className={cn()}>
      {emptyItems ? (
        <span className={cn('empty')}>Пусто</span>
      ) : ( 
        props.items.map(item => (
          <div key={item.code} className={cn('item')}>
            <Item 
              item={item}
              product={props.product}
              deleteFromCart={props.deleteFromCart} 
              onAddToCart={props.onAddToCart} 
              cartItem={props.cartItem}
            />
          </div>
        )
      ))}
        {!emptyItems && props.cartItem ? <div className={cn('total')}>
          <span>Итого</span>
          <span className={cn('total_price')}>{props?.product} &#8381;</span>
        </div> : null}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  cartItem: propTypes.bool,
  product: propTypes.number,
  deleteFromCart: propTypes.func
}

List.defaultProps = {
  items: [],
  onItemDelete: () => {}
}

export default React.memo(List);
