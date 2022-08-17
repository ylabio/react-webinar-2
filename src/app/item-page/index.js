import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Layout from '../../components/layout';
import BasketSimple from "../../components/basket-simple";
import ItemCard from "../../components/item-card";
import TextContentContext from "../../store/textcontext";

function ItemPage(){
    const store = useStore();
    const { itemId } = useParams();  
    
    useEffect(() => {
        store.get('itemDepiction').load(itemId);
    }, [itemId])

    const select = useSelector(state => ({
        isLoading: state.itemDepiction.status,
        depiction: state.itemDepiction.item,
        amount: state.basket.amount,
        sum: state.basket.sum,
        locales: state.locales,
    }))

    const callbacks = {
        // Открытие корзины
        openModalBasket: useCallback(() => {
          store.get('modals').open('basket')
        }, []),
        // Добавление в корзину
        addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
      };

    return (
        <TextContentContext.Provider value={select.locales[select.locales.lng]}>
            <Layout head={<h1>{select.depiction.title}</h1>}>
                <BasketSimple
                    text={select.locales[select.locales.lng].BASCKET_SHOW}
                    onOpen={callbacks.openModalBasket}
                    amount={select.amount} sum={select.sum}/>
                {select.isLoading === `${itemId} finished` && <ItemCard item={select.depiction} onAdd={callbacks.addToBasket} />}
            </Layout>
        </TextContentContext.Provider>)
}

export default React.memo(ItemPage);
