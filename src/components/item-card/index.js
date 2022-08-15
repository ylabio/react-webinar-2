import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ItemCard(props) {
  const cn = bem('ItemCard');
  return (
    <div className={cn()}>
      <div className={cn('description')}>{props.description}</div>
      <div className={cn('origin')}>
        Страна производитель: {props.originCountry}{' '}
      </div>
      <div className={cn('category')}>Категория: {props.category} </div>
      <div className={cn('yearOfProd')}>
        Год выпуска: {props.yearOfProduction}
      </div>
      <div className={cn('price')}>Цена: {props.price} </div>
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
  yearOfProduction: propTypes.number,
  price: propTypes.number,
  onAdd: propTypes.func
};

export default React.memo(ItemCard);
