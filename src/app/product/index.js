import React, {useCallback, useEffect, useState} from 'react';
import Layout from "../../components/layout";
import {useParams} from "react-router-dom";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

import BasketSimple from "../../components/basket-simple";
import ProductDescription from '../../components/product-description';

function Product() {
    const [loading, setLoading] = useState(true)

    const params = useParams();
    const prodId = params.id;

    const store = useStore();
    useEffect(() => {
        store.get('product').load(prodId);
        setLoading(false);
        console.log('ищу')
    }, [])

    const select = useSelector(state => ({
        item: state.product.item,
        amount: state.basket.amount,
        sum: state.basket.sum,
        language: state.language.language
    }));

    const callbacks = {
        // Открытие корзины
        openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
        // Добавление в корзину
        addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),

        changeLanguage: useCallback((lang) => store.get('language').setLanguage(lang))
      };

    return (
        <Layout head={<h1>Название товара</h1>} onChangeLanguage={callbacks.changeLanguage}>
            <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} lang={select.language}/>
            <ProductDescription item={select.item} loading={loading} onAdd={callbacks.addToBasket} lang={select.language}/> 
        </Layout>
    )
}

export default React.memo(Product); 