import React from 'react';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import { useState, useEffect, useCallback} from 'react';
import BusketItem from '../busketItem';


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
    const [strNumb,setStrNumb] = useState();
    const [strArr,setStrArr] = useState([]);

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
    let toConvertArr=[];
    for( let i=0;i<props.items.items.length;i++){
        if(props.items.items[i]['inCart']){
        arr.push(props.items.items[i]);
        strArr.push(props.items.items[i]['price']);
        sumAmount+=props.items.items[i]['inCart'];
        sumPrice=sumPrice+props.items.items[i]['inCart']*props.items.items[i]['price']
        }
    }
    setallAmount(sumAmount);
    setAllMoney(sumPrice);
    spaceAdder(allMoney);
    spaceAdder(strArr);
    
})
const spaceAdder=(x)=>{
    let str=x;
    if(typeof x==='number'){
        str=x.toString();
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
    if(typeof x==='number'){
        setStrNumb(strArr);
    }
    }
    

    
    
    }

return (<div>
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
            {
    arr.map(item=>
        <BusketItem key={item.code} item={item} props={props}/>
    )
}
                <div className={cn('downside')}>
                    <div className={cn('word')}>Итого</div>
                    <div className={cn('generalCost')}>{strNumb} ₽</div>
                </div>
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
