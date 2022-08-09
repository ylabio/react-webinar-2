import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import { useState,useEffect } from 'react';
import plural from 'plural-ru'

function Controls(props){
  const [allAmount,setallAmount]=useState([]);
  const [allMoney,setAllMoney]=useState([]);
  const [uniqueGoods,setUniqueGoods]=useState();
  const [strNumb,setStrNumb] = useState();
  

  const plural = require('plural-ru');

  const spaceAdder=()=>{
    let str=allMoney.toString();

    let strArr=[];
    for(let i=0;i<str.length;i++){
      strArr.push(str[i]);
    }
  
    if(strArr.length>3){
      let counter=0;

      for(let i=0;i<=strArr.length;i=i+3){
        if(strArr[str.length-i]){
          strArr.splice(-i-counter,0,' ');
          counter++;
        }
        
      }
      if(strArr[0]===' '){
        strArr.shift();
      }
    }
    strArr=strArr.join('')
    setStrNumb(strArr);
  }
  
  useEffect(()=>{
    let sumAmount=0;
    let sumPrice=0;
    let arr=[];
    let maxCounter=0;
    for( let i=0;i<props.items.items.length;i++){
        if(props.items.items[i]['inCart']){
        arr.push(props.items.items[i]);
        sumAmount+=props.items.items[i]['inCart'];
        sumPrice=sumPrice+props.items.items[i]['inCart']*props.items.items[i]['price']
        if(maxCounter<props.items.items[i]['counter']){
          maxCounter=props.items.items[i]['counter'];
        }
        }
    }
    setallAmount(sumAmount);
    setAllMoney(sumPrice);
    setUniqueGoods(maxCounter);
    spaceAdder();
  
    
})





  return (
    <div className='Controls'>
      <div className={'Controls-aboutBusket'+((allAmount) ? ' showen' : '')}>
      В корзине: <span  className='Controls-span'>{uniqueGoods}</span>
      <span  className='Controls-span'>
      {plural(uniqueGoods, ' товар', ' товара', ' товаров')} / {strNumb}  ₽ </span></div>
      <div className={'Controls-empty'+((!allAmount) ? ' showen' : '')}>
      В корзине: <span className='Controls-hollowSpan'>пусто</span>  </div>
      <button  className='Controls-button' onClick={props.onAdd}>Перейти</button>
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
