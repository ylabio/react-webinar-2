import React from 'react';
import propTypes from 'prop-types';
import './style.css';

function Controls({onGoToBasket}){
  return (
    <div className='Controls'>
      <button onClick={onGoToBasket}>Добавить</button>
    </div>
  )
}

Controls.propTypes = {
  onGoToBasket: propTypes.func.isRequired // Обязательное свойство - функция
}

Controls.defaultProps = {
  onGoToBasket: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
