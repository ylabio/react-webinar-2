import React from 'react';
import propTypes from 'prop-types';
import './style.css';

function Controls({openPopup}){
  return (
    <div className='Controls'>
      <button onClick={openPopup}>Добавить</button>
    </div>
  )
}

Controls.propTypes = {
  openPopup: propTypes.func // Обяхательное свойство - функция
}

Controls.defaultProps = {
  openPopup: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
