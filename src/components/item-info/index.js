import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import React, {useCallback} from 'react';
import numberFormat from '../../utils/number-format';
import './style.css';

function ItemInfo({_id, description, maidIn, category, edition, price, addToBasket, text}) {
  const cn = bem('ItemInfo');

  const callbacks = {
    addToBasket: useCallback(() => addToBasket(_id), [_id])
  };

  return (
    <div className={cn()}>
      <p className={cn('description')}>{description}</p>
      <p className={cn('country')}>
        {text.country}: <strong>{maidIn}</strong>
      </p>
      <p className={cn('category')}>
        {text.category}: <strong>{category}</strong>
      </p>
      <p className={cn('year')}>
        {text.edition}: <strong>{edition}</strong>
      </p>
      <strong className={cn('price')}>
        {text.price}: {numberFormat(price)} ₽
      </strong>
      <button onClick={callbacks.addToBasket}>{text.add}</button>
    </div>
  );
}

ItemInfo.propTypes = {
  _id: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  maidIn: propTypes.string.isRequired,
  category: propTypes.string.isRequired,
  edition: propTypes.number.isRequired,
  price: propTypes.number.isRequired,
  text: propTypes.object.isRequired
};

export default React.memo(ItemInfo);
