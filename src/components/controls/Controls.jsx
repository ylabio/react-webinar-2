import React, { useMemo, useState } from 'react';
import propTypes from 'prop-types';
import './style.css';

function Controls({ product, modalStatus, openModal }) {

  const handle = () => {
    openModal()
  }
  const [totalSum, setTotalSum] = useState(0)

  useMemo(() => {
    const res = product.map(elem => elem.price).reduce((elem, total) => total += elem, 0)
    setTotalSum(res)
  }, [product])

  return (
    <div className='Controls'>
      <span className='Controls-info'>В корзине: <strong>{product.length} товаров / {totalSum} ₽</strong></span>
      <button className='Controls-button' onClick={handle}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  setModalStatus: propTypes.func.isRequired // Обяхательное свойство - функция
}

Controls.defaultProps = {
  setModalStatus: () => { } // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
