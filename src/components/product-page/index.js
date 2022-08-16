import React, {useCallback} from "react";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import propTypes from 'prop-types';
import './style.css';

function ProductPage({product, onAdd, language, translate, codesProductPage}) {
  const cn = bem('ProductPage');

  const callbacks = {
    onAddProduct: useCallback((e) => onAdd(product._id), [onAdd, product._id])
  };

  return (
    <div className={cn()}>
      <div className={cn('description')}> {product.description}</div>
      <div className={cn('group')}>
        <div className={cn('name')}>{translate(language, codesProductPage.CODE_9) || 'Страна производитель:'}
          <span className={cn('value')}> {product.maidIn?.title} ({product.maidIn?.code})</span>
        </div>
      </div>
      <div className={cn('group')}>
        <p className={cn('name')}>{translate(language, codesProductPage.CODE_10) || 'Категория:'}
          <span className={cn('value')}> {product.category?.title}</span>
        </p>
      </div>
      <div className={cn('group')}>
        <p className={cn('name')}>{translate(language, codesProductPage.CODE_12) || 'Год выпуска:'}
          <span className={cn('value')}> {product.edition}</span>
        </p>
      </div>
      <div className={cn('price')}>{translate(language, codesProductPage.CODE_11) || 'Цена:'} {numberFormat(product.price)} ₽</div>
      <button className={cn('button')} onClick={callbacks.onAddProduct}>{translate(language, codesProductPage.CODE_13) || 'Добавить'}</button>
    </div>
  )
}

ProductPage.propTypes = {
  codesProductPage: propTypes.object.isRequired,
  translate: propTypes.func.isRequired,
  product: propTypes.object.isRequired,
  onAdd: propTypes.func.isRequired,
  language: propTypes.string.isRequired
}

ProductPage.defaultProps = {
  codesProductPage: {},
  translate: () => {},
};

export default React.memo(ProductPage)