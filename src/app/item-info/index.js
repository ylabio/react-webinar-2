import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import React, {useCallback, useEffect, useState} from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {useParams} from 'react-router';
import ItemDescription from '../../components/item-description';


function ItemInfo(){
    let { itemId } = useParams()
    console.log('ItemInfo')
    const [itemInfo, setItemInfo] = useState({})

    const store = useStore();
    const select = useSelector(state => ({
        amount: state.basket.amount,
        sum: state.basket.sum
    }));
    const callbacks = {
        openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
        addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    };
    const getCategory = (_id) => {
        const requestURL = `/api/v1/categories/${itemInfo.category._id}`
        fetch(requestURL).then(response => response.json())
            .then(json => setItemCategory(json.result.title))
    }
    const getCountry = (_id) => {
        const requestURL = `/api/v1/countries/${itemInfo.maidIn._id}`
        fetch(requestURL).then(response => response.json())
            .then(json => setItemCountry(json.result.title + ` (${json.result.code})`))
    }
    useEffect(() => {
        const requestURL = `/api/v1/articles/${itemId}`
        fetch(requestURL).then(response => response.json())
            .then(json => setItemInfo(json.result))
    }, [itemId])
    useEffect(() => {
        if(itemInfo.category) {
            getCategory(itemInfo._id)
        }
        if(itemInfo.maidIn) {
            getCountry(itemInfo._id)
        }
    }, [itemInfo._id, itemInfo.category, itemInfo.maidIn])

    return (
        <Layout head={<h1>{itemInfo.title}</h1>}>
            <BasketSimple onOpen={callbacks.openModalBasket} sum={select.sum} amount={select.amount}/>
            <ItemDescription item={itemInfo} onAddCallback={callbacks.addToBasket} category={itemCategory}
                             country={itemCountry}/>
        </Layout>
    )
}

export default React.memo(ItemInfo);