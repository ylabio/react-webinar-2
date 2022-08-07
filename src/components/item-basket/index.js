import React from "react";
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function ItemBasket({item, deleteItem, ind}){
    const cn = bem('ItemBasket');
    //  Цена за 1 шт. товара
    const price = item.price / item.num;

    return (
      <div className={cn()}>
        <div className={cn('number')}>
          {ind}
        </div>
        <div className={cn('title')}>
          {item.title}
        </div>
        <div className={cn('price-num')}>
          <div className={cn('price')}>
            {`${price.toLocaleString('ru')} ₽`}
          </div>
          <div className={cn('num')}>
            {item.num} шт
          </div>
        </div>
        <div className={cn('num-button')}>
          <button onClick={()=>deleteItem(item.code)}>
            Удалить
          </button>
        </div>
      </div>
  )
}
ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  deleteItem: propTypes.func.isRequired,
  ind: propTypes.number.isRequired
}

ItemBasket.defaultProps = {
  item: {},
  deleteItem: () => {},
  ind: 0
}

export default React.memo(ItemBasket);
