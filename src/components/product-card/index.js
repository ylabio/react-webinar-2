import React, {useCallback} from "react";
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "utils/numberFormat";
import './style.css';

function ProductCard({item, onAdd, strings}) {
  const cn = bem('ProductCard');

  const {madeIn, category, edition, price,button} = strings;

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
        <span className={cn('info')}>{madeIn}: <b>{item?.maidIn?.title} ({item?.maidIn?.code})</b></span>
        <span className={cn('info')}>{category}: <b>{item?.category?.title}</b></span>
        <span className={cn('info')}>{edition}: <b>{item?.edition}</b></span>
        <h3 className={cn('price')}>{price}: {numberFormat(item?.price)} ₽</h3>
        <button className={cn('button')} onClick={callbacks.onAdd}>{button}</button>
      </div>
    </article>
  );
}

ProductCard.prototypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func.isRequired,
  strings: propTypes.exact({
    madeIn: propTypes.string,
    category: propTypes.string,
    edition: propTypes.string,
    price: propTypes.string,
    button: propTypes.string,
  }).isRequired
};


export {ProductCard};
