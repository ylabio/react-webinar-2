import React from 'react';
import propTypes from 'prop-types';
import './style.css';

function Controls({onLogin, title}){
  return (
    <div className='Controls'>
      <button onClick={onLogin}>{title}</button>
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
