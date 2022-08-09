import React from 'react';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import { useState, useEffect, useCallback} from 'react';


function BusketItem(props){
    const cn = bem('popup');
    const [strNumb,setStrNumb] = useState(props.item.price);

    const spaceAdder=()=>{
    let str=props.item.price.toString();
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
        spaceAdder();
      })

      
console.log(props);
return (
                    <div  className={cn('item')}>
                        <div className={cn('number')}>
                        {props.item.code}
                        </div>
                        <div className={cn('name')}>
                        {props.item.title}
                        </div>
                        <div className={cn('cost')}>
                        {strNumb} ₽
                        </div>
                        <div className={cn('amount')}>
                        {props.item.inCart}  шт
                        </div>
                        <button onClick={()=>{props.props.eliminate(props.item)}} className={cn('deleter')}>
                            Удалить
                        </button>
                    </div>
  )
}

BusketItem.defaultProps = {
    eliminate: () => {} // Значение по умолчанию - функция-заглушка
  }

export default BusketItem;
