import React from 'react';
import propTypes from 'prop-types';
import './style.css';

function Controls({onOpenBasket}){
  return (
    <div className='Controls'>
      <button onClick={onOpenBasket}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onOpenBasket: propTypes.func.isRequired // Обяхательное свойство - функция
}

Controls.defaultProps = {
  onOpenBasket: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
