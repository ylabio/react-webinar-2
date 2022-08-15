import React, { useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { cn as bem } from '@bem-react/classname';
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Layout from '../layout';
import BasketSimple from "../basket-simple";
import ItemCard from "../item-card";
import routes from "../../API/routes";

function ItemPage(){
    const store = useStore();
    const { itemId } = useParams();
    const navigate = useNavigate(); 
    const cn = bem('Item-page');      
    
    useEffect(() => {
        store.get('itemDepiction').load(itemId);
    }, [])

    const select = useSelector(state => ({
        isLoading: state.itemDepiction.load,
        depiction: state.itemDepiction.item,
        amount: state.basket.amount,
        sum: state.basket.sum,
    }))

    const callbacks = {
        // Открытие корзины
        openModalBasket: useCallback(() => {
          navigate(routes.basket());
          store.get('modals').open('basket')
        }, []),
        // Добавление в корзину
        addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
      };
console.log(select.isLoading)
    return (
        <Layout head={<h1>{select.depiction.title}</h1>}>
            <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
            <ItemCard 
                _id={select.depiction._id}
                description={select.depiction.depiction}
                price={select.depiction.price}
                maidIn={select.depiction.maidIn}
                category={select.depiction.category}
                depiction={select.depiction.category}
                edition={select.depiction.edition}
                onAdd={callbacks.addToBasket} />
        </Layout>)
}

export default React.memo(ItemPage);
