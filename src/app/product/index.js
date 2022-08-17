import React, { useEffect, useCallback } from "react";
import Layout from "../../components/layout";
import { useLocation } from "react-router-dom";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import ContainerProduct from "../../components/container-product";
import BasketSimple from "../../components/basket-simple";
import "./style.css"






function Product(props) {

    const store = useStore();
    const productId = useLocation().state;


    useEffect(() => {
        store.get('catalog').loadProduct(productId);
    }, [])

    const callbacks = {
        openAndCloseModalBasket: [useCallback(() => store.get('modals').open('basket'), []), useCallback(() => store.get('modals').close('basket'), []),]
    }

    const { language, selectItem, amount, sum } = useSelector(state => ({
        selectItem: state.catalog.selectItem,
        amount: state.basket.amount,
        sum: state.basket.sum,
        language: state.multilang.CurrentLang
    }));



    return (
        <Layout head={<h1>{language.productTitle}</h1>}>
            <BasketSimple sum={sum} amount={amount} onOpen={callbacks.openAndCloseModalBasket}></BasketSimple>
            <ContainerProduct language={language} selectItem={selectItem} />
        </Layout>

    )
}


export default React.memo(Product);