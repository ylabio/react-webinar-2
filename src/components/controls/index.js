import React from 'react';
import propTypes from 'prop-types';
import './style.css';

function Controls({ text, action }) {
  return (
    <div className='Controls'>
      <button onClick={action}>{text}</button>
    </div>
  )
}

Controls.propTypes = {
  text: propTypes.string.isRequired,
  action: propTypes.func.isRequired // Обязательное свойство - функция
}

export default React.memo(Controls);
