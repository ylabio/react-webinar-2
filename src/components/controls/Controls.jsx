import React from 'react';
import propTypes from 'prop-types';
import './style.css';

function Controls({setModalStatus}){
  return (
    <div className='Controls'>
      <button onClick={setModalStatus}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  setModalStatus: propTypes.func.isRequired // Обяхательное свойство - функция
}

Controls.defaultProps = {
  setModalStatus: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
