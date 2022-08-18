import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import React, {useCallback} from 'react';
import numberFormat from '../../utils/numberFormat';
import './style.css';

function ItemInfo({info, text, addToBasket}) {
  const cn = bem('ItemInfo');

  const callbacks = {
    addToBasket: useCallback(() => addToBasket(info._id), [info._id])
  };

  return (
    <div className={cn()}>
      <p className={cn('description')}>{info.description}</p>
      <p className={cn('country')}>
        {text.country}: <strong>{info.maidIn}</strong>
      </p>
      <p className={cn('category')}>
        {text.category}: <strong>{info.category}</strong>
      </p>
      <p className={cn('year')}>
        {text.edition}: <strong>{info.edition}</strong>
      </p>
      <strong className={cn('price')}>
        {text.price}: {numberFormat(info.price)} ₽
      </strong>
      <button onClick={callbacks.addToBasket}>{text.add}</button>
    </div>
  );
}

ItemInfo.propTypes = {
  text: propTypes.object.isRequired,
  info: propTypes.object.isRequired,
  addToBasket: propTypes.func.isRequired
};

export default React.memo(ItemInfo);
