import React from 'react';
import propTypes from 'prop-types';
import './style.css';

function CustomButton({action, valueButton}) {
  return (
      <div className='CustomButton'>
        <button onClick={action}>{valueButton}</button>
      </div>
  )
}

CustomButton.propTypes = {
  action: propTypes.func.isRequired, // Обязательное свойство - функция
  valueButton: propTypes.string
}

CustomButton.defaultProps = {
  action: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(CustomButton);
