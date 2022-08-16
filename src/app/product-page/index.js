import React, {useCallback, useEffect} from 'react';
import Layout from "../../components/layout";
import HeaderWrapper from "../../components/header-wrapper";
import ProductPageContent from "../../components/product-page-content";
import {useParams} from "react-router-dom";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Navigation from "../../components/navigation";
import BasketSimple from "../../components/basket-simple";

const ProductPage = () => {

    const {product} = useParams()
    const store = useStore();
    const select = useSelector(state => ({
        item: state.item_page.item,
        amount: state.basket.amount,
        sum: state.basket.sum
    }));

    const callbacks = {
        onAdd: useCallback(_id => store.get('basket').addToBasket(_id), []),
        onOpen: useCallback(() => store.get('modals').open('basket'), [])
    };
    useEffect(()=> {
        store.get('item_page').loadItem(product);
    }, [product])

    return (
        <Layout head={<h1>Название товара</h1>}>
            <HeaderWrapper>
                <Navigation/>
                <BasketSimple onOpen={callbacks.onOpen} amount={select.amount} sum={select.sum}/>
            </HeaderWrapper>
            <ProductPageContent item={select.item} onAdd={callbacks.onAdd}/>
        </Layout>
            )
        }


export default React.memo(ProductPage)