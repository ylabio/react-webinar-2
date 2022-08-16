import React from 'react';
import propTypes from 'prop-types';
import BasketSimple from "../../components/basket-simple";
import Menu from '../menu';
import './style.css';

function Controls(props){
  return (
    <div className='Controls'>
      <Menu translate={props.translate}/>
      <BasketSimple onOpen={props.onOpen} 
                    amount={props.amount} 
                    sum={props.sum} 
                    translate={props.translate}/>
    </div>
  )
}

Controls.propTypes = {
  onOpen: propTypes.func.isRequired, // Обяхательное свойство - функция
  sum: propTypes.number,
  amount: propTypes.number,
  translate: propTypes.func
}

Controls.defaultProps = {
  onOpen: () => {}, // Значение по умолчанию - функция-заглушка
  sum: 0,
  amount: 0,
  translate: () => {}
}

export default React.memo(Controls);
