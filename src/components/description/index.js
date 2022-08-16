import React, {useCallback, useEffect, useState} from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {
  useParams
} from "react-router-dom";
import BasketSimple from '../basket-simple';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Description (props){
    console.log('Description');
    const store = useStore();
    const [isLoading, setIsLoading] = useState(true);
    const [maidIn, setMaidIn] = useState({});
    const [category, setCategory] = useState({})
    const{id} = useParams();
    const cn = bem('Description');

    const select = useSelector(state => ({
        itemsCount: state.catalog.itemsCount,
        items: state.catalog.items,
        amount: state.basket.amount,
        sum: state.basket.sum
      }));

      const currentItem = select
        .items
        .filter((item)=>item._id === id)[0];

      const callbacks = {
        // Открытие корзины
        openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
        onAdd: useCallback((e) => props.onAdd(currentItem._id), [props.onAdd, currentItem]),
      };

      useEffect(()=>{
        fetch(`/api/v1/countries/${currentItem.maidIn._id}?fields=title%2Ccode`)
        .then(res=>res.json())
        .then(data=>setMaidIn(data.result))
        .then(
        fetch(`/api/v1/categories/${currentItem.category._id}?fields=title`)
        .then(res=>res.json())
        .then(data=>setCategory(data.result))
        )
        .then(()=>setIsLoading(!isLoading));
        },[]
    )

    return(
       !isLoading && <div className={(cn())}>
        <div className={cn('head')}><h1>
          {currentItem.title}
          </h1>
          </div>
        <BasketSimple onOpen={callbacks.openModalBasket} 
                          amount={select.amount} 
                          sum={select.sum}/>
      <div className={cn('content')}>
      <div className={cn('string')}>{currentItem.description}</div>
      <span className={cn('string')}>
        {'Страна производитель: '}</span> 
        <span><b>{maidIn.title} ({maidIn.code})</b></span>
      <div className={cn('string')}>
        <span>{`Категория: `}</span>
        <span><b>{category.title}</b></span>
      </div>
      <div className={cn('string')}>
        <span>{`Год выпуска: `}</span> 
        <span><b>{currentItem.edition}</b></span>
      </div>
      <div className={cn('string')}>
        <h2>{`Цена: ${currentItem.price.toLocaleString('ru-RU')+' \u20bd'}`}</h2>
      </div>
      <button onClick={callbacks.onAdd}>Добавить</button>
        </div>
        </div>
    )
}

export default React.memo(Description);