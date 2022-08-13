import React, {useCallback} from "react";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import propTypes from 'prop-types';

import './style.css';

const cn = bem('ProductPage');

function ProductPage(props) {

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd, props.item._id])
  };

  return (
    <div className={cn()}>
      <div className={cn('description')}> {props.item.description}</div>
      <div className={cn('group')}>
        <div className={cn('name')}>Страна производитель:
          <span className={cn('value')}> {props.item.maidIn?.title}</span>
        </div>
      </div>
      <div className={cn('group')}>
        <p className={cn('name')}>Категория:
          <span className={cn('value')}> {props.item.category?.title}</span>
        </p>
      </div>
      <div className={cn('group')}>
        <p className={cn('name')}>Год выпуска:
          <span className={cn('value')}> {props.item.edition}</span>
        </p>
      </div>
      <div className={cn('price')}>Цена: {numberFormat(props.item.price)} ₽</div>
      <button className={cn('button')} onClick={callbacks.onAdd}>Добавить</button>
    </div>
  )
}

export default React.memo(ProductPage)