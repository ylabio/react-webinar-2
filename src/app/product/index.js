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
    console.log(window.location.hash);

    useEffect(() => {
        productId ? window.location.hash = productId : ""
        store.get('catalog').loadProduct(window.location.hash.slice(1));
    }, [])

    const callbacks = {
        openAndCloseModalBasket: [useCallback(() => store.get('modals').open('basket'), []), useCallback(() => store.get('modals').close('basket'), []),],
        addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), [])

    }

    const { modalName, language, selectItem, amount, sum } = useSelector(state => ({
        selectItem: state.catalog.selectItem,
        amount: state.basket.amount,
        sum: state.basket.sum,
        language: state.multilang.CurrentLang,
        modalName: state.modals.name
    }));


    return (
        <Layout head={<h1>{selectItem?.title}</h1>}>
            <BasketSimple modalName={modalName} language={language} sum={sum} amount={amount} onOpen={callbacks.openAndCloseModalBasket}></BasketSimple>
            <ContainerProduct add={callbacks.addToBasket} language={language} selectItem={selectItem} />
        </Layout>

    )
}


export default React.memo(Product);