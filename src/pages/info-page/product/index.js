import React from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import numberFormat from "../../../utils/number-format";
import propTypes from 'prop-types';

function Product(props) {
  const cn = bem('Product');

  return (
    <section className={cn()}>
      <p>{props.description}</p>
      <div className={cn('container')}>
        <div className={cn('subtitle')}>
          <span>Страна производитель: </span>
          <span>{`${props.maidIn.title} (${props.maidIn.code})`}</span>
        </div>
        <div className={cn('subtitle')}>
          <span>Категория: </span>
          <span>{props.category}</span>
        </div>
        <div className={cn('subtitle')}>
          <span>Год выпуска: </span>
          <span>{props.edition}</span>
        </div>
      </div>
      <div className={cn('price')}>
        <span>Цена: </span>
        <span>{numberFormat(props.price)} ₽</span>
      </div>
      <button onClick={props.addToBasket}>Добавить</button>
    </section>
  )
}

Product.propTypes = {
  description: propTypes.string,
  edition: propTypes.number,
  category: propTypes.string,
  maidIn: propTypes.object,
  price: propTypes.number,
  addToBasket: propTypes.func,
}

export default React.memo(Product);
