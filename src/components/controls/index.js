import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import Button from '../button';

function Controls({ onAdd }) {
  return (
    <div className='Controls'>
      <Button onClick={onAdd}>Перейти</Button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: propTypes.func // Обяхательное свойство - функция
}

Controls.defaultProps = {
  onAdd: () => { } // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
