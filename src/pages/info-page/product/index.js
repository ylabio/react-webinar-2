import React from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import numberFormat from "../../../utils/number-format";
import propTypes from 'prop-types';

function Product(props) {
  const cn = bem('Product');

  return (
    <section className={cn()}>
      <p>{props.info.description}</p>
      <div className={cn('container')}>
        <div className={cn('subtitle')}>
          <span>{props.t('maid')}: </span>
          <span>{`${props.info.maidIn.title} (${props.info.maidIn.code})`}</span>
        </div>
        <div className={cn('subtitle')}>
          <span>{props.t('category')}: </span>
          <span>{props.info.category.title}</span>
        </div>
        <div className={cn('subtitle')}>
          <span>{props.t('year')}: </span>
          <span>{props.info.edition}</span>
        </div>
      </div>
      <div className={cn('price')}>
        <span>{props.t('price')}: </span>
        <span>{numberFormat(props.info.price)} ₽</span>
      </div>
      <button onClick={props.addToBasket}>{props.t('add')}</button>
    </section>
  )
}

Product.propTypes = {
  info: propTypes.object,
  addToBasket: propTypes.func,
  t: propTypes.func
}

export default React.memo(Product);
