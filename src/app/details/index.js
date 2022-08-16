import React, {useCallback, useLayoutEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ItemDetail from "../../components/item-detail/item-detail";
import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import PropTypes from 'prop-types';


function Details({store, amount, sum}) {
    const {id} = useParams();
    const [item, setItem] = useState(null);

    useLayoutEffect(() => {
        store.get('catalog').getItem(id).then(res => setItem( res))
    }, [id]);

    const callbacks = {
        openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
        addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    };


    return (
        <Layout head={<h1>{item?.title}</h1>}>
            <BasketSimple onOpen={callbacks.openModalBasket} sum={sum} amount={amount}/>
            <ItemDetail item={item} onAdd={callbacks.addToBasket}/>
        </Layout>
    );
}

Details.propTypes = {
    store: PropTypes.object,
    amount: PropTypes.number,
    sum: PropTypes.number
}

export default React.memo(Details)