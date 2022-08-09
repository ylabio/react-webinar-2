import { cn as bem } from "@bem-react/classname";
import React from "react";
import propTypes from 'prop-types';
import Button from '../button'
import './style.css';
import plural from 'plural-ru';
import { sumBasket } from "../../utils";

function BasketInfo(props) {
  const cn = bem('Basket');
  return (
    <div className={cn()}>
      <div className={cn('count')}>
        <p>
          В корзине:
          <span>
            {props.basket.length ? `${props.basket.length} ${plural(props.basket.length, 'товар', 'товара', 'товаров')}  / ${sumBasket(props.basket).toLocaleString("ru-RU", { style: "currency", currency: "RUB", minimumFractionDigits: 0 })}` : "пусто "}
          </span>
        </p>
      </div>
      <Button title="Перейти" callBack={props.switchModal} />
    </div>
  )
}

BasketInfo.propTypes = {
  switchModal: propTypes.func.isRequired,
  basket: propTypes.arrayOf(propTypes.object).isRequired,
}

BasketInfo.defaultProps = {
  basket: [],
  switchModal: () => { },
}

export default React.memo(BasketInfo);
