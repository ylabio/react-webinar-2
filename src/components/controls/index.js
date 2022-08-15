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

Controls.propTypes = {
  onAdd: propTypes.func.isRequired
}

export default React.memo(Controls);
