import React from 'react';
import propTypes from 'prop-types';
import './style.css';

function Controls({onAdd, onCart}){
  return (
    <div className='Controls'>
      {onAdd && <button onClick={onAdd}>Добавить</button>}
      {onCart && <button onClick={onCart}>Перейти</button>}
    </div>
  )
}

Controls.propTypes = {
  onAdd: propTypes.func,
  onCart: propTypes.func
}

export default React.memo(Controls);
