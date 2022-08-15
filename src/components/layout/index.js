import React, {useCallback, useEffect, useState} from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';
import {Outlet, useParams} from "react-router";
import BasketSimple from "../basket-simple";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {getItemById} from "../../api/api";

function Layout({head}) {
    const cn = bem('Layout');

    const store = useStore();
    const [title, setTitle] = useState('');
    const params = useParams();

    useEffect(() => {
        store.get('catalog').loadInit();
    }, [])

    useEffect(() => {
        const changeTitle = async () => {
            if (!(Object.keys(params).length === 0)) {
                const json = await getItemById(params.id);
                setTitle(json.data.result.title);
            }
        }
        changeTitle();
    }, [params])

    const select = useSelector(state => ({
        items: state.catalog.items,
        amount: state.basket.amount,
        sum: state.basket.sum
    }));

    const callbacks = {
        // Открытие корзины
        openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    };

    return (
        <div className={cn()}>
            <div className={cn('head')}>
                <h1>
                    {Object.keys(params).length === 0 ? 'Магазин' : title}
                </h1>
            </div>
            <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
            <div className={cn('content')}>
                <Outlet/>
            </div>
        </div>
    )
}

export default Layout;
