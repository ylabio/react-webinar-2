import React from 'react';
import { cn as bem } from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import './style.css';

function Product(props) {
  const {product} = props;
  const cn = bem('Product');

  return (
    <div className={cn()}>
      <ul className={cn('description')}>
        <li>{product.description}</li>
        <li>
          Страна производитель:{' '}
          <strong>{`${product.maidIn.title} (${product.maidIn.code})`}</strong>
        </li>
        <li>
          Категория: <strong>{product.category.title}</strong>
        </li>
        <li>
          Год выпуска: <strong>{product.edition}</strong>
        </li>
        <li className={cn('price')}>
          <strong>Цена: {numberFormat(product.price)} ₽</strong>
        </li>
        <li>
          <button onClick={() => props.addToBasket(product._id)}>Добавить</button>
        </li>
      </ul>
    </div>
  );
}

export default Product;
