import React, { useEffect, useState , useCallback} from "react";
import {useParams} from 'react-router-dom'
import Layout from '../../components/layout'
import ProductContent from "../../components/product-content";
import { getGoodInfo } from "../../api";
import LoadingScreen from "../../components/loading-screen";
import useStore from "../../utils/use-store";
import TopPanel from "../../components/top-panel";

function ProductPage(){
    
    const params = useParams();
    const store = useStore();
    const [productInfo , setProductInfo] = useState();
    const [loadingScreen , setLoadingScreen] = useState(false);

    useEffect(() => {
        setLoadingScreen(true)
        getGoodInfo(params.id).then(data => {
            setProductInfo(data.result)
            setLoadingScreen(false)
        }).catch(err => {
            console.log(err);
            alert('Что-то пошло не так , обновите страницу.');
        })
    },[params])

    const callbacks = {
        // Добавление товара в корзину
        addToBasket: useCallback(product => store.get('basket').addProductToBasket(product), []),
      };
    
    return(
        <>
        {productInfo && 
            <Layout head={<h1>{productInfo.title}</h1>}>
            <TopPanel />
            <ProductContent productInfo={productInfo}
                            addToBasket={callbacks.addToBasket}
             />
            </Layout>
        || 
        <></>}
        {loadingScreen  && <LoadingScreen/>}
        </>    
    )
}

export default ProductPage;