import React, { useMemo, useState } from 'react';
import plural from 'plural-ru';
import propTypes from 'prop-types';
import './style.css';

function Controls({ product, setModalStatus }) {

  const [totalSum, setTotalSum] = useState(0);
  const formatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
  });

  useMemo(() => {
    const res = product.map(elem => elem.price).reduce((elem, total) => total += elem, 0);
    setTotalSum(res);
  }, [product])

  return (
    <div className='Controls'>
      <span className='Controls-info'>В корзине: {
        product.length === 0 ?
          <strong>пусто</strong> :
          <strong>{product.length} {plural(totalSum, 'товара', 'товаров', 'товар', 'товара')} / {formatter.format(totalSum)}</strong>
      }</span>
      <button className='Controls-button' onClick={() => setModalStatus()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  setModalStatus: propTypes.func.isRequired // Обяхательное свойство - функция
}

Controls.defaultProps = {
  setModalStatus: () => { } // Значение по умолчанию - функция-заглушка
}

export default (Controls);
