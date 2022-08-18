import List from "../../components/list";
import React, {useCallback, useEffect, useState} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {Pagination} from "../../components/pagination";
import {cn as bem} from "@bem-react/classname";
import Loading from "../../components/loading";

function Main() {
    const store = useStore();
    const cn = bem('Main');
    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    const select = useSelector(state => ({
        amount: state.catalog.amount,
        items: state.catalog.items,
        isLoading: state.catalog.isLoading
    }));

    useEffect(() => {
        if (page === 0) {
            store.get('catalog').load(10, 0);
        } else {
            store.get('catalog').load(limit, (page - 1) * limit);
        }
        store.get('catalog').setIsLoading();
    }, [page]);

    const callbacks = {
        addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    };

    const renders = {
        item: useCallback(item => <Item item={item} link={`/articles/${item._id}`} onAdd={callbacks.addToBasket}/>, []),
    }

    if (select.isLoading) {
        return <Loading/>
    }

    return (
        <>
            <List items={select.items} renderItem={renders.item}/>
            <Pagination activeIndex={page} setPage={setPage} itemsPerPage={10} totalItems={select.amount}/>
        </>
    )
}

export default React.memo(Main);
