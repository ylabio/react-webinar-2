import {cn as bem} from '@bem-react/classname';
import React, {useCallback} from 'react';
import numberFormat from '../../utils/numberFormat';

function ItemInfo({_id, description, maidIn, category, edition, price, addToBasket}) {
  const cn = bem('ItemInfo');

  const callbacks = {
    addToBasket: useCallback(() => addToBasket(_id), [_id])
  };

  return (
    <div className={cn()}>
      <p className={cn('description')}>{description}</p>
      <p className={cn('country')}>
        Страна производитель: <strong>{maidIn}</strong>
      </p>
      <p className={cn('category')}>
        Категория: <strong>{category}</strong>
      </p>
      <p className={cn('year')}>
        Год выпуска: <strong>{edition}</strong>
      </p>
      <strong className={cn('price')}>Цена: {numberFormat(price)} ₽</strong>
      <button onClick={callbacks.addToBasket}>Добавить</button>
    </div>
  );
}

export default React.memo(ItemInfo);
