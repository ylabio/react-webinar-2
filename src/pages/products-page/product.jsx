import React, { useCallback } from 'react';
import cls from './product.module.css'
import { Link } from 'react-router-dom';

const Product = ({ _id, description, maidIn, category, edition, price, addToBasket }) => {
  const callbacks = {
    addToBasket: useCallback(() => addToBasket(_id), [_id])
  };
  return (
    <>
    <div className={cls.productContainer}>
      <p>{description}</p>
      <p>
        Страна производитель: <strong>{maidIn}</strong>
      </p>
      <p>
        Категория: <strong>{category}</strong>
      </p>
      <p>
        Год выпуска: <strong>{edition}</strong>
      </p>
      <strong>Цена: {price}</strong>
    </div>
      <button className={cls.productBut} onClick={callbacks.addToBasket}>Добавить</button>
    </>
  );
}

export default Product;
