import React, {useCallback, useEffect} from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';
import {Outlet} from "react-router";
import BasketSimple from "../basket-simple";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

function Layout({head}) {
    const cn = bem('Layout');

    const store = useStore();

    useEffect(() => {
        store.get('catalog').loadInit();
    }, [])

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
                    {head}
                </h1>
            </div>
            <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
            <div className={cn('content')}>
                <Outlet/>
            </div>
        </div>
    )
}

Layout.propTypes = {
    head: propTypes.node,
    children: propTypes.node,
}

Layout.defaultProps = {}

export default React.memo(Layout);
