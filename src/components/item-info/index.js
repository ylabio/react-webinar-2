import React from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import numberFormat from '../../utils/numberFormat';
import './style.css';

function ItemInfo({ item, country, category, addToBasket }) {
  const cn = bem('Iteminfo');

  return (
    <div className={cn()}>
      <div className={cn('description')}>{item.description}</div>
      <div className={cn('info-wrapper')}>
        Страна производитель:{' '}
        <div className={cn('info')}>{` ${country.title} (${country.code})`}</div>
      </div>
      <div className={cn('info-wrapper')}>
        Категория:<div className={cn('info')}>{` ${category.title}`}</div>
      </div>
      <div className={cn('price')}>Цена: {numberFormat(item.price)} ₽</div>
      <button onClick={() => addToBasket()}>Добавить</button>
    </div>
  );
}

ItemInfo.propTypes = {
  item: propTypes.object.isRequired,
  country: propTypes.object.isRequired,
  category: propTypes.object.isRequired,
  addToBasket: propTypes.func.isRequired,
};

export default React.memo(ItemInfo);
