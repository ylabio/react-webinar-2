import React, {useCallback} from "react";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import propTypes from 'prop-types';
import './style.css';
import changeLanguage from "../../utils/changeLanguage";



function ProductPage({product, onAdd, language}) {
  const cn = bem('ProductPage');

  console.log(typeof product._id)

  const callbacks = {
    onAddProduct: useCallback((e) => onAdd(product._id), [onAdd, product._id])
  };

  return (
    <div className={cn()}>
      <div className={cn('description')}> {product.description}</div>
      <div className={cn('group')}>
        <div className={cn('name')}>Страна производитель:
          <span className={cn('value')}> {product.maidIn?.title}</span>
        </div>
      </div>
      <div className={cn('group')}>
        <p className={cn('name')}>Категория:
          <span className={cn('value')}> {product.category?.title}</span>
        </p>
      </div>
      <div className={cn('group')}>
        <p className={cn('name')}>Год выпуска:
          <span className={cn('value')}> {product.edition}</span>
        </p>
      </div>
      <div className={cn('price')}>Цена: {numberFormat(product.price)} ₽</div>
      <button className={cn('button')} onClick={callbacks.onAddProduct}>{changeLanguage(language, 'ADD')}</button>
    </div>
  )
}

ProductPage.propTypes = {
  product: propTypes.object.isRequired,
  onAdd: propTypes.func.isRequired,
  language: propTypes.string.isRequired
}

export default React.memo(ProductPage)