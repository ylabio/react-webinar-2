import React, {useCallback} from "react";
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import numberFormat from "utils/numberFormat";

function ProductCard({item, onAdd}) {
  const cn = bem('ProductCard');

  const callbacks = {
    onAdd: useCallback(() => onAdd(item._id), [onAdd, item])
  };

  if (!item?._id) {
    return <h3 style={{textAlign: "center"}}>Loading...</h3>;
  }

  return (
    <article className={cn()}>
      <div className={cn('wrapper')}>
        <p className={cn('description')}>
          {item?.description}
        </p>
        <span className={cn('info')}>Страна производитель: <b>{item?.maidIn?.title} ({item?.maidIn?.code})</b></span>
        <span className={cn('info')}>Категория: <b>{item?.category?.title}</b></span>
        <span className={cn('info')}>Год выпуска: <b>{item?.edition}</b></span>
        <h3 className={cn('price')}>Цена: {numberFormat(item?.price)} ₽</h3>
        <button className={cn('button')} onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </article>
  );
}

ProductCard.prototypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func.isRequired
};


export {ProductCard};
