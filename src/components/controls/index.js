import React from 'react';
import propTypes from 'prop-types';
import './style.css';

function Controls({title, handler}){
  return (
    <div className='Controls'>
      <button onClick={handler}>{title}</button>
    </div>
  )
}

Controls.propTypes = {
  handler: propTypes.func.isRequired // Обяхательное свойство - функция
}

Controls.defaultProps = {
  onAdd: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
