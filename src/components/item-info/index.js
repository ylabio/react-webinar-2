import React from 'react';
import './styles.css'
import {cn as bem} from "@bem-react/classname";

function ItemInfo({item, addToBasket}) {
  const cn = bem('ItemInfo');

  return (
    <div className={cn()}>
      <div className={cn('description')}>{item.description}</div>
      <div className={cn('category')}>
        Страна производитель:{' '}
        <span className={cn('info')}>
          {item.madeInTitle}({item.madeInCode})
        </span>
      </div>
      <div className={cn('category')}>
        Категория: <span className={cn('info')}>{item.category}</span>
      </div>
      <div className={cn('category')}>
        Год выпуска: <span className={cn('info')}>{item.edition}</span>
      </div>
      <div className={cn('price')}>Цена: {item.price} ₽</div>
      <button onClick={() => addToBasket(item.id)}>Добавить</button>
    </div>
  );
}

export default React.memo(ItemInfo);