import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item({item, serialNumber, onAddItemToBasket, onDeleteItemToBasket}) {
  const cn = bem('Item');

  return (
    <div className={cn({'selected': item.selected})}>
      <div className={cn('number')}>
        {item.count ? serialNumber : item.code}
        {/* {item.code} */}
      </div>

      <div className={cn('title')}>
        {item.title}
      </div>

      <div className={cn('price')}>
        {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽"}
      </div>

      {item.count ? 
        <div className={cn('count')}>
          {item.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " шт"}
        </div>
        :
        null
      } 
      {onDeleteItemToBasket ? 
        <div className={cn('actions')}>
          <button onClick={() => onDeleteItemToBasket(item)}>
            Удалить
          </button>
        </div> 
        :
        <div className={cn('actions')}>
          <button onClick={() => onAddItemToBasket(item)}>
            Добавить
          </button>
        </div>
      }
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object,
  serialNumber: propTypes.number,
  onAddItemToBasket: propTypes.func,
  onDeleteItemToBasket: propTypes.func
}

export default React.memo(Item);
