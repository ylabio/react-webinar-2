import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import { useState,useEffect } from 'react';
import plural from 'plural-ru'

function Controls(props){
  const [allAmount,setallAmount]=useState([]);
  const [allMoney,setAllMoney]=useState([]);
  

  const plural = require('plural-ru');
  
  useEffect(()=>{
    let sumAmount=0;
    let sumPrice=0;
    let arr=[];
    for( let i=0;i<props.items.items.length;i++){
        if(props.items.items[i]['inCart']){
        arr.push(props.items.items[i]);
        sumAmount+=props.items.items[i]['inCart'];
        sumPrice=sumPrice+props.items.items[i]['inCart']*props.items.items[i]['price']
        }
    }
    setallAmount(sumAmount);
    setAllMoney(sumPrice);
    
    
  
    
})





  return (
    <div className='Controls'>
      <div className={'Controls-aboutBusket'+((allAmount) ? ' showen' : '')}>
      В корзине:<span  className='Controls-span'>{allAmount}</span>
      {plural(allAmount, ' товар', ' товара', ' товаров')} / {allMoney} ₽ </div>
      <button onClick={props.onAdd}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: propTypes.func.isRequired // Обяхательное свойство - функция
}

Controls.defaultProps = {
  onAdd: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
