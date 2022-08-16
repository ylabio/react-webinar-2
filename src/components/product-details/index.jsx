import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import './style.css';

const ProductDetails = ({ details, onAdd }) => {
  const callbacks = {
    onAdd: useCallback(() => onAdd(details._id), [details, onAdd]),
  };

  return (
    <div className='product-details'>      
      <p>{details.description}</p>
      <p>Страна производитель: <b>{`${details.maidIn.title} (${details.maidIn.code})`}</b></p>
      <p>Категория: <b>{details.category.title}</b></p>
      <p>Год выпуска: <b>{details.edition}</b></p>
      <p className='product__price'>{`Цена: ${details.price} ₽`}</p>
      <button onClick={callbacks.onAdd}>Добавить</button>
    </div>
  )
}

ProductDetails.propTypes = {
  details: propTypes.object.isRequired,
  onAdd: propTypes.func,
};

export default ProductDetails;