import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ItemCard(props) {
  const cn = bem('ItemCard');
  return (
    <div className={cn()}>
      <div className={cn('description')}>
        Описание товара из множества букв. Описание товара из букв. В АПИ может
        быть меньше букв. Описание товара из множества букв.
      </div>
      <div className={cn('origin')}>Страна производитель: </div>
      <div className={cn('category')}>Категория: </div>
      <div className={cn('yearOfProd')}>Год выпуска: </div>
      <div className={cn('price')}>Цена: </div>
      <div>
        <button>Добавить</button>
      </div>
    </div>
  );
}

ItemCard.propTypes = {
  description: propTypes.string,
  originCountry: propTypes.string,
  category: propTypes.string,
  yearOfProduction: propTypes.string,
  price: propTypes.number,
  onAdd: propTypes.func
};

export default React.memo(ItemCard);
