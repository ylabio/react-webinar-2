import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List(props) {
  const cn = bem('List');

  return (
    <div className={cn()}>{props.items.map(item =>
      <div key={item.code} className={cn('item')}>
        <Item
          item={item}
          basket={props.basket}
          onAmountInBasket={props.onAmountInBasket}
          onPriceProduct={props.onPriceProduct}
          onAmountProduct={props.onAmountProduct}
          onAddBasket={props.onAddBasket}
          priceProduct={props.priceProduct}
          amountProduct={props.amountProduct}
        />
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onPriceProduct: propTypes.func,
  onItemSelect: propTypes.func,
  onItemDelete: propTypes.func,
  onAddBasket: propTypes.func,
  onAmountProduct: propTypes.func,
  onAmountInBasket: propTypes.func,
  priceProduct: propTypes.number,
  amountProduct: propTypes.number,
}

List.defaultProps = {
  items: [],
  onItemSelect: () => { },
  onAddBasket: () => { },
  onAmountProduct: () => { },
  onPriceProduct: () => { },
  onAmountInBasket: () => { },
  priceProduct: 0,
  amountProduct: 0,
}

export default React.memo(List);
