import React from 'react';
import propTypes from 'prop-types';
import './style.css';

function Controls({onAdd}){
  return (
    <div className='Controls'>
      <div className='cart'>
        {`В корзине: `}
        {`2 товара / 223 ₽`}
      </div>
      <div className={'actions'}>
        <button onClick={onAdd}>Перейти</button>
      </div>
    </div>
  )
}

Controls.propTypes = {
  onAdd: propTypes.func.isRequired // Обяхательное свойство - функция
}

Controls.defaultProps = {
  onAdd: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
