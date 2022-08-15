import React from 'react';
import propTypes from 'prop-types';
import BasketSimple from "../../components/basket-simple";
import NavLink from '../nav-link';
import './style.css';

function Controls(props){
  return (
    <div className='Controls'>
      <NavLink link={'/'} text={'Главная'}/>
      <BasketSimple onOpen={props.onOpen} amount={props.amount} sum={props.sum}/>
    </div>
  )
}

Controls.propTypes = {
  onOpen: propTypes.func.isRequired, // Обяхательное свойство - функция
  sum: propTypes.number,
  amount: propTypes.number,
}

Controls.defaultProps = {
  onOpen: () => {}, // Значение по умолчанию - функция-заглушка
  sum: 0,
  amount: 0,
}

export default React.memo(Controls);
