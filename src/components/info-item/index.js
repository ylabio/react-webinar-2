import React from 'react'
import BasketSimple from '../basket-simple'
import Layout from '../layout'
import useSelector from './../../utils/use-selector';
import { useEffect, useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../utils/use-store';
import './style.css';
import { ContextTitle } from '../../store/contextTitle';
import Info from './info';
function InfoItem(props) {
    const store = useStore()
    const { title } = useContext(ContextTitle)
    const { id } = useParams()
    const select = useSelector(state => ({
        cuurentItem: state.catalog.cuurentItem,
        sum: state.basket.sum,
        amount: state.basket.amount,
    }));

    const callbacks = {
        addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
        isEmpty: useCallback(obj => store.get('catalog').isEmpty(obj), []),
        openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
        cuurentItemDefaultValue: useCallback(() => store.get('catalog').cuurentItemDefaultValue(), []),

    };

    useEffect(() => {
        store.get('catalog').getItemById(id)
    }, [id])

    return (
        <Layout head={<h1>{title}</h1>}>
            <BasketSimple
                cuurentItemDefaultValue={callbacks.cuurentItemDefaultValue}
                onOpen={callbacks.openModalBasket}
                amount={select.amount}
                sum={select.sum} />
            <Info
                cuurentItem={select.cuurentItem}
                isEmpty={callbacks.isEmpty}
                addToBasket={callbacks.addToBasket}
            />
        </Layout>

    )
}

export default InfoItem