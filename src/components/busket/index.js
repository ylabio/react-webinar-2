import React from 'react';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import { useState, useEffect, useCallback} from 'react';


function Busket(props){
    const callbacks = {
    
        eliminate: useCallback((e) => {
            e.stopPropagation();
            props.eliminate();
        }, [props.onDelete,  props.item])
        };


    const cn = bem('popup');
    const [allAmount,setallAmount]=useState([]);
    const [allMoney,setAllMoney]=useState([]);
    const [busket,setBusket]=useState([]);

    let arr=[];
    let proposition=props.items.items;
    let counter=1;
    for( let i=0;i<proposition.length;i++){
        if(proposition[i]['inCart']){
            proposition[i].counter=counter;
            arr[counter]=proposition[i];
            counter++;
        }
    }
    

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
    <div className={cn({'open':props.items.open})} >
    <div className={cn('body')} >
        <div  className={cn('content')}>
            <div className={cn('top')}>
                <h2 className={cn('caption')}>
                    Корзина
                </h2>
                <button className={cn('closer')} onClick={props.deleter} >Закрыть</button>
            </div>
            <div className={cn('main')}>
                {arr.map(item=>
                        <div key={item.code} className={cn('item')}>
                        <div className={cn('number')}>
                        {item.counter}
                        </div>
                        <div className={cn('name')}>
                        {item.title}
                        </div>
                        <div className={cn('cost')}>
                        {item.price} ₽
                        </div>
                        <div className={cn('amount')}>
                        {item.inCart}  шт
                        </div>
                        <button onClick={()=>{props.eliminate(item)}} className={cn('deleter')}>
                            Удалить
                        </button>
                    </div>
                )}
                <div className={cn('downside')}>
                    <div className={cn('word')}>Итого</div>
                    <div className={cn('generalCost')}>{allMoney} ₽</div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

Busket.defaultProps = {
    eliminate: () => {} // Значение по умолчанию - функция-заглушка
  }

export default Busket;
