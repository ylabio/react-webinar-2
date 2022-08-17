import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router";
import useStore from "../../utils/use-store";
import {getItemById} from "../../api/api";
import useSelector from "../../utils/use-selector";
import Outlet from "../custom-outlet";
import CustomOutlet from "../custom-outlet";

function Layout() {
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
    }, [params.id])

    const select = useSelector(state => ({
        items: state.catalog.items,
        amount: state.basket.amount,
        sum: state.basket.sum
    }));

    const callbacks = {
        openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    };

    return (
        <CustomOutlet title={Object.keys(params).length === 0 ? 'Магазин' : title}
                amount={select.amount} sum={select.sum}
                onOpen={callbacks.openModalBasket}/>
    )
}


export default Layout;
