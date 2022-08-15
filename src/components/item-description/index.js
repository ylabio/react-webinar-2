import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function ItemDescription(props) {

  const {description, price, edition, category, maidIn} = props.item;

  const cn = bem('Item-info');

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.item?._id), [props.onAdd, props.item]),
  };

  return (
    <div className={cn()}>
      <p className={cn('description')}>{description}</p>
      <p className={cn('country')}>Страна производитель: <span>{maidIn?.title}</span></p>
      <p className={cn('category')}>Категория: <span>{category?.title}</span></p>
      <p className={cn('year')}>Год выпуска: <span>{edition}</span></p>
      <p className={cn('price')}>Цена: {price} ₽</p>
      <button onClick={callbacks.onAdd}>Добавить</button>
    </div>
  )
}

ItemDescription.propTypes = {

}

ItemDescription.defaultProps = {

}

export default React.memo(ItemDescription);
