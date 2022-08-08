import React from 'react';
import propTypes from 'prop-types';
import './style.css';

function Controls({ modalStatus, setModalStatus }) {

  const handle = () => {
    setModalStatus(true)
    console.log(modalStatus)
  }
  return (
    <div className='Controls'>
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
