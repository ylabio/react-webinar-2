import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import './style.css';

function Controls(props){
  const callbacks = {
    onCartOpen: useCallback(() => {
      props.onCartOpen();
    }, [])
  };

  return (
    <div className='Controls'>
      <button onClick={callbacks.onCartOpen}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onCartOpen: propTypes.func.isRequired // Обязательное свойство - функция
}

Controls.defaultProps = {
  onCartOpen: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
