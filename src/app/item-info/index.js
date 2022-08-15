import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import {cn as bem} from "@bem-react/classname";
import { useParams } from "react-router-dom"
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";
import "./style.css"

function ItemInfo() {

    console.log('ItemInfo');

    const store = useStore();
    const { id } = useParams();
    const cn = bem('ItemInfo');

   useEffect(() => {
       store.get('item').load(id);
       return () => {
           store.get('item').unmount()
       }
   }, [id]);


    const select = useSelector(state => ({
        item: state.item,
        amount: state.basket.amount,
        sum: state.basket.sum
    }));

    const callbacks = {
        // Открытие корзины
        openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
        // Добавление в корзину
        addToBasket: useCallback(_id => store.get('basket').addToBasket(id), []),
    };


    return (
        <>
            {select.item.item ? (
                <Layout head={<h1>{select.item.item.title}</h1>}>
                    <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
                    <div className={cn()}>
                        <p>{select.item.item.description}</p>
                        <p>Страна производитель: <span className={cn("span")}>
                            {select.item.item.country}<span className={cn("span")}>({select.item.item.countryCode})</span>
                        </span></p>
                        <p>Категория: <span className={cn("span")}>{select.item.item.category}</span></p>
                        <p>Год выпуска: <span className={cn("span")}>{select.item.item.edition}</span></p>
                        <span className={cn("price")}>Цена: <span className={cn("price")}>{select.item.item.price}</span></span>
                        <button type="button" onClick={callbacks.addToBasket} className={cn("btn")}>Добавить</button>
                    </div>
                </Layout>
            ) : ""}
        </>
    )
}

export default React.memo(ItemInfo);
