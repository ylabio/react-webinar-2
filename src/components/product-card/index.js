import React, {useCallback, useContext} from "react";
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "utils/numberFormat";
import {LocalisationContext} from "l10n";
import {l10n} from "l10n/strings";
import './style.css';

function ProductCard({item, onAdd}) {
  const cn = bem('ProductCard');

  const {lang} = useContext(LocalisationContext);

  const button = l10n.buttons.add[lang];
  const madeIn = l10n.product.card.madeIn[lang];
  const category = l10n.product.card.category[lang];
  const edition = l10n.product.card.edition[lang];
  const price = l10n.product.card.price[lang];

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
  onAdd: propTypes.func.isRequired
};


export {ProductCard};
