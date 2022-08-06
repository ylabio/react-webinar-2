import React from 'react';
import propTypes from 'prop-types';
import './style.css';

function Controls({ setActive }){
  
  // reducer fn 
  const counterPrice = () => "пусто"
   
   
   return (
    <div className='Controls'>
      <p  style={{padding: 0 , margin: 0 ,marginRight: '20px', display: 'inline-block',}}
      >В корзине: {counterPrice()}</p>
      
      <button onClick={() => setActive(true)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: propTypes.func.isRequired // Обязательное свойство - функция
}

Controls.defaultProps = {
  onAdd: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
