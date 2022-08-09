import { cn as bem } from "@bem-react/classname";
import React from "react";
import propTypes from 'prop-types';
import Button from '../button'
import './style.css';
import plural from 'plural-ru';


function BasketInfo({ uniqueProducts, total, switchModal }) {
  const cn = bem('Basket');
  return (
    <div className={cn()}>
      <div className={cn('count')}>
        <p>
          В корзине:
          <span>
            {uniqueProducts ?
              `${uniqueProducts} ${plural(uniqueProducts, 'товар', 'товара', 'товаров')}  / ${(total).toLocaleString("ru-RU", { style: "currency", currency: "RUB", minimumFractionDigits: 0 })}`
              :
              "пусто "}
          </span>
        </p>
      </div>
      <Button title="Перейти" callBack={switchModal} />
    </div>
  )
}

BasketInfo.propTypes = {
  switchModal: propTypes.func.isRequired,
  total: propTypes.number.isRequired,
  uniqueProducts: propTypes.number.isRequired
}



export default React.memo(BasketInfo);
