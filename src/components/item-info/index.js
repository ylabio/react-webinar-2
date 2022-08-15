import React, {useCallback, useEffect} from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import numberFormat from "../../utils/number-format";
import propTypes from "prop-types";

function ItemInfo({_id, description, maidIn, category, edition, price, addToBasket}){
  const cn = bem('ItemInfo');

  const callbacks = {
    addToBasket: useCallback(() => addToBasket(_id), [_id])
  };

  return (
    <div className={cn()}>
      <p className={cn('description')}>{description}</p>
      <p className={cn('maidIn')}>
        Страна производитель: <strong>{maidIn}</strong>
      </p>
      <p className={cn('category')}>
        Категория: <strong>{category}</strong>
      </p>
      <p className={cn('edition')}>
        Год выпуска: <strong>{edition}</strong>
      </p>
      <p className={cn('price')}>
        <strong>Цена: {numberFormat(price)} ₽</strong>
      </p>
      <button onClick={callbacks.addToBasket}>Добавить</button>
    </div>
  )
}

ItemInfo.propTypes = {
  _id: propTypes.string.isRequired,
  description: propTypes.string,
  maidIn: propTypes.string,
  category: propTypes.string,
  edition: propTypes.number,
  price: propTypes.number,
  addToBasket: propTypes.func
}

ItemInfo.defaultProps = {
  description: 'description',
  maidIn: 'maidIn',
  category: 'category',
  edition: 0,
  price: 0,
  addToBasket: () => {}
}

export default React.memo(ItemInfo);
