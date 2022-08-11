import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import prettyMoney from 'pretty-money';
import Item from "../item";
import './style.css';
import ItemCart from '../item-cart';

function List(props) {
  const cn = bem('List');

  return (
    <div className={cn()}>{
      props.items.length
        ? props.items.map(item =>
          <div key={item.code} className={cn('item')}>
            {props.isCart
             ? (<ItemCart
                item={item}
                onSelect={props.onItemSelect}
                onDelete={props.onItemDelete}
                />)
             : (<Item
              item={item}
              isCartItem={props.isCart}
              onSelect={props.onItemSelect}
              onDelete={props.onItemDelete}
              onAddToCart={props.onItemAddToCart}
            />)}
          </div>)
        : (<p style={{textAlign: 'center'}}><strong>Пусто</strong></p>)
      }
    {(props.isCart && props.items.length > 0) &&
      (<div className={cn('cart')}>
        <strong>Итого</strong>
        <strong>{prettyMoney({currency: '₽', thousandsDelimiter: ' '}, props.total)}</strong>
      </div>)}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  isCart: propTypes.bool,
  total: propTypes.number,
  onItemSelect: propTypes.func,
  onItemDelete: propTypes.func,
  onItemAddToCart: propTypes.func,
}

List.defaultProps = {
  items: [],
  isCart: false,
  total: 0,
  onItemSelect: () => {},
  onItemDelete: () => {},
  onItemAddToCart: () => {},
}

export default React.memo(List);
