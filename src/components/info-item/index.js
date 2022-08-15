import React from 'react'
import BasketSimple from '../basket-simple'
import Layout from '../layout'
import useSelector from './../../utils/use-selector';
import { useState, useEffect, useCallback} from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../utils/use-store';
import numberFormat from '../../utils/numberFormat';
import './style.css'
function InfoItem(props) {
    const store = useStore()
    const { id } = useParams()
    const select = useSelector(state => ({
        cuurentItem: state.catalog.cuurentItem,
        
    }));
    const callbacks = {
        addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
        isEmpty: useCallback(obj=> store.get('catalog').isEmpty(obj),[]),       
      };

    useEffect(() => {
        store.get('catalog').getItemById(id)
    }, [id])


    return callbacks.isEmpty(select.cuurentItem) ? (
        <div className='InfoItem'>


            <p>{select.cuurentItem.description}</p>
            <p>Страна производитель:<span>{select.cuurentItem.maidIn.title}</span> </p>
            <p>Категория:<span>{select.cuurentItem.category.title}</span> </p>
            <p>Год выпуска: <span>{select.cuurentItem.edition}</span></p>
            <p className='price'>Цена:{numberFormat(select.cuurentItem.price)} ₽</p>
            <button onClick={()=>callbacks.addToBasket(select.cuurentItem._id)}>Добавить</button>

        </div>
    ) : null
}

export default InfoItem