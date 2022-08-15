import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductPage from "../../components/product-page";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";



function PropductPage(){

    const {id} = useParams()

    const store = useStore();

    useEffect(() => {
        store.get('product').getProduct(id);
      }, [id]);
      
    const callbacks ={
        loadPage: useCallback((id) => store.get('product').getProduct(id)),
        openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
        // Добавление в корзину
        addToBasket: useCallback((_id) => store.get('basket').addToBasket(_id), []),
    }

    const select = useSelector(state => ({//каждый раз при рендере достаем паарметры приложения из состояния
        amount: state.basket.amount,
        sum: state.basket.sum,
        product: state.product.currenProduct,
        id: state.product.currentId
      }));

    return(
        <ProductPage callbacks={callbacks} select={select}/>
    )
        
    
}

export default PropductPage