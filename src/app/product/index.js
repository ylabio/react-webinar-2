import React, {useEffect, useCallback} from 'react'
import { useParams } from 'react-router-dom';
import Layout from '../../components/layout';
import BasketSimple from '../../components/basket-simple';
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import ProductInfo from '../../components/product-info';

export default function index() {
    let { id } = useParams();

    const store = useStore();

    useEffect(() => {
        store.get('product').load(id);
    }, [])

    const select = useSelector(state => ({
        name: state.product.name,
        desc: state.product.desc,
        maidIn: state.product.maidIn,
        category: state.product.category,
        date: state.product.date,
        price: state.product.price,
        amount: state.basket.amount,
        sum: state.basket.sum
    }));

    const callbacks = {
        // Открытие корзины
        openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
        // Добавление в корзину
        addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    };

    return (
        <Layout head={<h1>{select.name}</h1>}>
            <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
            <ProductInfo>
                <p>{select.desc}</p>
                <p>Страна производитель: <b>{select.maidIn}</b></p>
                <p>Категория: <b>{select.category}</b></p>
                <p>Год выпуска: <b>{select.date}</b></p>
                <h3>Цена: {Number(select.price).toLocaleString()} ₽</h3>
                <button onClick={()=>{callbacks.addToBasket(id)}}>Добавить</button>
            </ProductInfo>
        </Layout>
    )
}