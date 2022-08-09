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
  priceProduct: propTypes.number.isRequired,
  amountProduct: propTypes.number.isRequired,
  onPriceProduct: propTypes.func,
  onItemSelect: propTypes.func,
  onAddBasket: propTypes.func,
  onAmountProduct: propTypes.func,
  onAmountInBasket: propTypes.func,
}

List.defaultProps = {
  onItemSelect: () => { },
  onAddBasket: () => { },
  onAmountProduct: () => { },
  onPriceProduct: () => { },
  onAmountInBasket: () => { },

}

export default React.memo(List);
