import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import numberFormat from '../../utils/numberFormat';

function ItemCard(props) {
  const cn = bem('ItemCard');
  return (
    <div className={cn()}>
      <div className={cn('description')}>{props.description}</div>
      <div className={cn('origin')}>
        Страна производитель:{' '}
        <span>
          {props.originCountry} ({props.countryCode})
        </span>{' '}
      </div>
      <div className={cn('category')}>
        Категория: <span>{props.category}</span>{' '}
      </div>
      <div className={cn('yearOfProd')}>
        Год выпуска: <span>{props.yearOfProduction}</span>
      </div>
      <div className={cn('price')}>Цена: {numberFormat(props.price)} ₽ </div>
      <div>
        <button onClick={props.onAdd}>Добавить</button>
      </div>
    </div>
  );
}

ItemCard.propTypes = {
  description: propTypes.string,
  originCountry: propTypes.string,
  countryCode: propTypes.string,
  category: propTypes.string,
  yearOfProduction: propTypes.number,
  price: propTypes.number,
  onAdd: propTypes.func
};

ItemCard.defaultProps = {
  onAdd: () => {}
};

export default React.memo(ItemCard);
