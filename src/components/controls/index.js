import React from 'react';
import propTypes from 'prop-types';
import './style.css';

function Controls({onAdd, title}){
  return (
    <div className='Controls'>
      <button className='Controls-button' onClick={onAdd}>{title}</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: propTypes.func.isRequired // Обяхательное свойство - функция
}

Controls.defaultProps = {
  onAdd: () => {},
  title: ''// Значение по умолчанию - функция-заглушка

}

export default React.memo(Controls);
