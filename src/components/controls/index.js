import React from 'react';
import propTypes from 'prop-types';
import './style.css';

function Controls({onAdd}){
  return (
    <div className='Controls'>
      <button onClick={onAdd}>Добавить</button>
    </div>
  )
}

// Комментарии, как наглядный пример, но надо либо удалять isRequired, либо удалять соответствующее поле из defaultProps
Controls.propTypes = {
  onAdd: propTypes.func.isRequired // Обязательное свойство - функция
}

Controls.defaultProps = {
  onAdd: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
