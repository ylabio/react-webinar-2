import React, {useCallback, useEffect} from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {useParams} from "react-router-dom";
import BasketSimple from '../basket-simple';
import numberFormat from '../../utils/numberFormat';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Description (props){
    console.log('Description');
    const store = useStore();
    const {id} = useParams();
    const cn = bem('Description');

    const select = useSelector(state => ({
      items: state.catalog.items,
      amount: state.basket.amount,
      sum: state.basket.sum,
      _id: state.product._id,
      title: state.product.title,
      description: state.product.description,
      country: state.product.maidIn.country,
      countryCode: state.product.maidIn.code,
      edition: state.product.edition,
      price: state.product.price,
      category: state.product.category
    }));
    
    const item = select.items.filter((item)=> item._id === id)[0];

      const callbacks = {
        // Открытие корзины
        openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
        onAdd: useCallback((e) => props.onAdd(item._id), [props.onAdd, item]),
      };

      useEffect(()=>{
        if (select.items.length > 0) {
          store.get('product').load(id);
        }
        else {
          store.get('catalog').loadId(id);
          store.get('product').load(id);
        }
        
        },[]
    )

    return(
      <div className={(cn())}>
        <div className={cn('head')}><h1>
          {select.title}
          </h1>
          </div>
        <BasketSimple onOpen={callbacks.openModalBasket} 
                          amount={select.amount} 
                          sum={select.sum}/>
      <div className={cn('content')}>
      <div className={cn('string')}>{select.description}</div>
      <span className={cn('string')}>
        {'Страна производитель: '}</span> 
        <span><b>{select.country} ({select.countryCode})</b></span>
      <div className={cn('string')}>
        <span>{`Категория: `}</span>
        <span><b>{select.category}</b></span>
      </div>
      <div className={cn('string')}>
        <span>{`Год выпуска: `}</span> 
        <span><b>{select.edition}</b></span>
      </div>
      <div className={cn('string')}>
        <h2>{`Цена: ${numberFormat(select.price)+' \u20bd'}`}</h2>
      </div>
      <button onClick={callbacks.onAdd}>Добавить</button>
        </div>
        </div>
    )
}

export default React.memo(Description);