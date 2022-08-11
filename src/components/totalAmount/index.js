import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";

function TotalAmount(props){
  const cn = bem('TotalAmount');

  return (
    <>
    {props.quantityUnicItemsCart ? 
      (<div className={cn('sum')}>
        <div>Итого</div>
        <div>{`${props.sumPricesInCart.toLocaleString()} ₽`}</div>
      </div>) : 
      (<div className={cn('sum')}>
        <div>Корзина пуста</div>
      </div>)
    }
    </>
  )
}

TotalAmount.propTypes = {
  sumPricesInCart: propTypes.number.isRequired,
  quantityUnicItemsCart: propTypes.number.isRequired
}

TotalAmount.defaultProps = {
  sumPricesInCart: 0,
  quantityUnicItemsCart: 0
}

export default React.memo(TotalAmount);
