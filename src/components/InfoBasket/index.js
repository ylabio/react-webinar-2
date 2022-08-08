import React from 'react';
import propTypes from 'prop-types';
import './style.css';

import Button from '../button';




function InfoBasket({ tPaP, modalVal, setModal }) {

  const [quantity, price, word] = tPaP;

  return (
    <div className='Total-sum'>
      <p className='Total-sum-p'>В корзине: <strong>{typeof (quantity) === "number" ? `${word} / ${price} ₽` : "пусто"}</strong></p>
      <Button title="Перейти" onClick={() => setModal(!modalVal)} />
    </div>
  )
}

InfoBasket.propTypes = {
  onAdd: propTypes.func.isRequired // Обязхательное свойство - функция
}
InfoBasket.defaultProps = {
  onAdd: () => { } // Значение по умолчанию - функция-заглушка
}

export default React.memo(InfoBasket);
