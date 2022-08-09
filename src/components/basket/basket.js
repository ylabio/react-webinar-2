import React, { memo } from "react"
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import ItemBasket from "../item-basket";
import List from "../list";

function Basket({ basket, deleteItem, total, uniqueProducts }) {
  const cn = bem('List');
  return (
    <>
      {
        uniqueProducts ?
          <>
            <List
              cn={cn()}
            >
              {basket.map(item =>
                <div key={item.code} className={cn('item')}>
                  <ItemBasket item={item} callBack={deleteItem} title={"Удалить"} />
                </div>
              )}
            </List>
            <div className={cn('total-price')}>
              Итого <span>{(total).toLocaleString("ru-RU", { style: "currency", currency: "RUB", minimumFractionDigits: 0 })}</span>
            </div>
          </>
          :
          <div className={cn('nothing')}>
            Корзина пуста
          </div>
      }
    </>
  )
}


Basket.propTypes = {
  uniqueProducts: propTypes.node.isRequired,
  deleteItem: propTypes.func.isRequired,
  basket: propTypes.arrayOf(propTypes.object).isRequired,
  total: propTypes.number.isRequired,
}


export default memo(Basket)
